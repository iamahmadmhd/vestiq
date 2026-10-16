import { Stack, type StackProps } from 'aws-cdk-lib';
import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import type { Construct } from 'constructs';

import type { StageConfig } from '../config/stages';

export interface ObservabilityStackProps extends StackProps {
    stage: StageConfig;
    /** Monthly budget limit in USD. */
    limitUsd: number;
    /** Who gets the budget alerts; without it the budget exists but nobody is notified. */
    alertEmail: string | undefined;
}

/**
 * A monthly cost budget that emails at 80% actual and 100% forecast spend.
 * The dashboard, alarms and SNS topic from the roadmap's hardening step land in this same
 * stack once the Pipeline/Api Lambdas they watch exist.
 */
export class ObservabilityStack extends Stack {
    constructor(scope: Construct, id: string, props: ObservabilityStackProps) {
        super(scope, id, props);

        const subscribers = props.alertEmail
            ? [{ subscriptionType: 'EMAIL', address: props.alertEmail }]
            : [];

        new CfnBudget(this, 'MonthlyBudget', {
            budget: {
                budgetName: `vestiq-${props.stage.name}-monthly`,
                budgetType: 'COST',
                timeUnit: 'MONTHLY',
                budgetLimit: { amount: props.limitUsd, unit: 'USD' },
            },
            notificationsWithSubscribers: subscribers.length
                ? [
                      {
                          notification: {
                              notificationType: 'ACTUAL',
                              comparisonOperator: 'GREATER_THAN',
                              threshold: 80,
                              thresholdType: 'PERCENTAGE',
                          },
                          subscribers,
                      },
                      {
                          notification: {
                              notificationType: 'FORECASTED',
                              comparisonOperator: 'GREATER_THAN',
                              threshold: 100,
                              thresholdType: 'PERCENTAGE',
                          },
                          subscribers,
                      },
                  ]
                : undefined,
        });
    }
}
