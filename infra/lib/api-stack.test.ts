import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { describe, it } from 'vitest';

import { stageFromContext } from '../config/stages';
import { ApiStack } from './api-stack';

function synth() {
    const app = new App();
    const stack = new ApiStack(app, 'Api', { stage: stageFromContext('dev') });
    return Template.fromStack(stack);
}

describe('ApiStack', () => {
    it('exposes a GET /health route backed by a Lambda function', () => {
        const t = synth();
        t.resourceCountIs('AWS::ApiGatewayV2::Api', 1);
        t.hasResourceProperties('AWS::ApiGatewayV2::Route', { RouteKey: 'GET /health' });
        t.hasResourceProperties('AWS::Lambda::Function', { Handler: 'index.handler', Runtime: 'nodejs24.x' });
    });
});
