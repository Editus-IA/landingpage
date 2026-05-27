export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipos permitidos — rastreabilidade de mudanças de segurança
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'security', // Correção de vulnerabilidade (tipo dedicado)
        'chore', // Manutenção, dependências
        'docs', // Documentação
        'test', // Testes
        'refactor', // Refatoração sem mudança de comportamento
        'perf', // Performance
        'ci', // Pipeline CI/CD
        'revert', // Revert de commit
      ],
    ],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 200],
  },
}
