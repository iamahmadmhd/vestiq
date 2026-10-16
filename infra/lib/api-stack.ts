import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import type { Construct } from 'constructs';

import type { StageConfig } from '../config/stages';

export interface ApiStackProps extends StackProps {
    stage: StageConfig;
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const RETENTION_BY_DAYS: Record<StageConfig['logRetentionDays'], RetentionDays> = {
    7: RetentionDays.ONE_WEEK,
    30: RetentionDays.ONE_MONTH,
};

/** The HTTP API. Currently just the unauthenticated health check from `@vestiq/api`. */
export class ApiStack extends Stack {
    public readonly apiUrl: string;

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const healthLogs = new LogGroup(this, 'HealthFunctionLogs', {
            retention: RETENTION_BY_DAYS[props.stage.logRetentionDays],
            removalPolicy: props.stage.retainData ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
        });

        const healthFn = new NodejsFunction(this, 'HealthFunction', {
            entry: join(__dirname, '../../services/api/src/health.ts'),
            handler: 'handler',
            runtime: Runtime.NODEJS_24_X,
            memorySize: 128,
            timeout: Duration.seconds(5),
            logGroup: healthLogs,
        });

        const api = new HttpApi(this, 'HttpApi', { apiName: `vestiq-${props.stage.name}-api` });
        api.addRoutes({
            path: '/health',
            methods: [HttpMethod.GET],
            integration: new HttpLambdaIntegration('HealthIntegration', healthFn),
        });

        this.apiUrl = api.apiEndpoint;
        new CfnOutput(this, 'ApiUrl', { value: this.apiUrl });
    }
}
