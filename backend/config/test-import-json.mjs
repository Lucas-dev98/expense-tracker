// Importa o arquivo serviceAccountKey.json como JSON usando import assertions (ESM).
// Isso permite garantir que o arquivo seja tratado como JSON nativamente pelo Node.js.
// Útil para testar se o arquivo está acessível e válido no caminho correto.
const serviceAccount = await import('../serviceAccountKey.json', { assert: { type: "json" } });

// Exibe o conteúdo do arquivo de chave de serviço no console para conferência.
// Assim, você pode verificar se o JSON foi carregado corretamente.
console.log(serviceAccount);