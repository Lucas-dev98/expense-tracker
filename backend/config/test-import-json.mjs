const serviceAccount = await import('../serviceAccountKey.json', { assert: { type: "json" } });
console.log(serviceAccount);