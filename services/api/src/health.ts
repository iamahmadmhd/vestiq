import type { HealthResponse } from '@vestiq/contracts';
import type { APIGatewayProxyResultV2 } from 'aws-lambda';

/** GET /health — the only unauthenticated route. */
export async function handler(): Promise<APIGatewayProxyResultV2> {
    const body: HealthResponse = { status: 'ok', version: process.env.APP_VERSION ?? 'dev' };
    return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    };
}
