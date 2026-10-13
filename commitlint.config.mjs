export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [
            2,
            'always',
            ['mobile', 'api', 'pipeline', 'domain', 'contracts', 'infra', 'repo', 'deps'],
        ],
        'scope-empty': [1, 'never'],
    },
};
