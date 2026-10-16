import { App, Tags } from 'aws-cdk-lib';
import 'dotenv/config';

import { stageFromContext } from '../config/stages';
import { ApiStack } from '../lib/api-stack';
import { BudgetStack } from '../lib/budget-stack';

const app = new App();
const stage = stageFromContext(app.node.tryGetContext('stage'));
const env = { account: stage.account, region: stage.region };
const prefix = `Vestiq-${stage.name}`;

Tags.of(app).add('app', 'vestiq');
Tags.of(app).add('stage', stage.name);

new BudgetStack(app, `${prefix}-Budget`, {
    env,
    stage,
    limitUsd: 10,
    alertEmail: process.env.VESTIQ_ALERT_EMAIL,
});

new ApiStack(app, `${prefix}-Api`, { env, stage });

// Roadmap step 3 adds the Auth, Data and Storage stacks here.

app.synth();
