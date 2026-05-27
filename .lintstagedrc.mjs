export default {
  // TypeScript e Vue — lint + fix automático apenas nos arquivos staged
  '**/*.{ts,tsx,vue,mjs,js}': [
    'eslint --fix --max-warnings=0',
  ],

  // JSON e YAML — valida estrutura (previne config malformada)
  '**/*.{json,yml,yaml}': [
    'prettier --write',
  ],

  // Bloqueia arquivos de certificado/chave privada
  '**/*.{pem,key,p12,pfx,jks}': (filenames) => {
    if (filenames.length > 0) {
      throw new Error(`Arquivo de certificado/chave privada detectado: ${filenames.join(', ')} — BLOQUEADO.`)
    }
    return []
  },
}
