export type StageName = 'dev' | 'prod';

export interface StageConfig {
    name: StageName;
    /** Set via the CDK_DEFAULT_ACCOUNT of the SSO profile you deploy with. */
    account: string | undefined;
    region: 'eu-central-1';
    logRetentionDays: 7 | 30;
    /** Keep data when a stack is deleted. */
    retainData: boolean;
}

export const STAGES: Record<StageName, Omit<StageConfig, 'account'>> = {
    dev: { name: 'dev', region: 'eu-central-1', logRetentionDays: 7, retainData: false },
    prod: { name: 'prod', region: 'eu-central-1', logRetentionDays: 30, retainData: true },
};

export function stageFromContext(value: unknown): StageConfig {
    const name = (value ?? 'dev') as string;
    if (name !== 'dev' && name !== 'prod') {
        throw new Error(`Unknown stage "${name}". Use -c stage=dev or -c stage=prod.`);
    }
    return { ...STAGES[name], account: process.env.CDK_DEFAULT_ACCOUNT };
}
