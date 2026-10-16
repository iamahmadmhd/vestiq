import { Stack, type StackProps } from 'aws-cdk-lib';
import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import type { Construct } from 'constructs';

import type { StageConfig } from '../config/stages';

export interface BudgetStackProps extends StackProps {
    stage: StageConfig;
    /** Monthly limit in USD. */
    limitUsd: number;
    /** Who gets the alerts; without it the budget exists but nobody is notified. */
    alertEmail: string | undefined;
}

/** A monthly cost budget that emails at 80% actual and 100% forecast spend. */
export class BudgetStack extends Stack {
    constructor(scope: Construct, id: string, props: BudgetStackProps) {
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
