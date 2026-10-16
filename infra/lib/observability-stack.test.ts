import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { describe, expect, it } from 'vitest';

import { stageFromContext } from '../config/stages';
import { ObservabilityStack } from './observability-stack';

function synth(alertEmail: string | undefined) {
    const app = new App();
    const stack = new ObservabilityStack(app, 'Observability', {
        stage: stageFromContext('dev'),
        limitUsd: 10,
        alertEmail,
    });
    return Template.fromStack(stack);
}

describe('ObservabilityStack', () => {
    it('creates a $10 monthly cost budget with email alerts', () => {
        const t = synth('me@example.com');
        t.hasResourceProperties('AWS::Budgets::Budget', {
            Budget: { BudgetType: 'COST', TimeUnit: 'MONTHLY', BudgetLimit: { Amount: 10, Unit: 'USD' } },
        });
        const budget = Object.values(t.findResources('AWS::Budgets::Budget'))[0];
        expect(budget?.Properties.NotificationsWithSubscribers).toHaveLength(2);
    });

    it('still synthesizes without an alert email', () => {
        const budget = Object.values(synth(undefined).findResources('AWS::Budgets::Budget'))[0];
        expect(budget?.Properties.NotificationsWithSubscribers).toBeUndefined();
    });

    it('rejects unknown stages', () => {
        expect(() => stageFromContext('staging')).toThrow(/Unknown stage/);
    });
});
