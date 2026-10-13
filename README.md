# Vestiq

A serverless wardrobe app on AWS: photograph your clothes, confirm what AI recognized, ask for an outfit in plain words. Expo app (Android first) + API Gateway, Lambda, DynamoDB, S3, SQS and Bedrock, all defined in AWS CDK.

## Layout

| Path                 | What                                                                       |
| -------------------- | -------------------------------------------------------------------------- |
| `apps/mobile`        | Expo app: Expo Router, Uniwind, React Native Reusables                     |
| `packages/domain`    | Taxonomy and pure logic (later: the look engine) shared by app and Lambdas |
| `packages/contracts` | Zod schemas for the API and errors                                         |
| `services/api`       | API Lambda handlers                                                        |
| `services/pipeline`  | `recognizeUpload` and `embedItem` Lambdas                                  |
| `infra`              | AWS CDK app (`eu-central-1`, stages `dev` and `prod`)                      |

## Setup

Requires Node 24+ and pnpm 12.

```bash
pnpm install          # also installs the git hooks
pnpm check            # lint, format check, typecheck, tests, cdk synth
```

## Git hooks (Husky)

| Hook         | Runs                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `pre-commit` | lint-staged: ESLint and Prettier on staged files                                                                         |
| `commit-msg` | commitlint, Conventional Commits with scopes `mobile`, `api`, `pipeline`, `domain`, `contracts`, `infra`, `repo`, `deps` |
| `pre-push`   | `turbo run typecheck test`                                                                                               |

There is no CI server; the hooks are the gate. `git commit --no-verify` skips them deliberately.

Example commit message: `feat(domain): add the womenswear taxonomy`.
