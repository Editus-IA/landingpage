# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| main    | ✅ Yes    |
| develop | ✅ Yes    |
| outros  | ❌ No     |

## Reporting a Vulnerability

**Não abra uma issue pública para reportar vulnerabilidades.**

Envie um relatório privado para: **security@editus.ai**

Inclua:
- Descrição da vulnerabilidade
- Passos para reprodução
- Impacto potencial
- Sugestão de mitigação (opcional)

Responderemos em até **48 horas** e trabalharemos para corrigir em até **7 dias úteis** para issues críticas.

## Security Measures

Este projeto implementa:
- SAST via Semgrep + CodeQL em cada PR
- SCA via OSV Scanner + Dependabot
- Secrets scanning via Gitleaks
- OWASP Top 10 compliance checks
- Pre-commit hooks locais
- CSP com nonces por request
- Rate limiting com Redis
- HSTS + Security Headers
