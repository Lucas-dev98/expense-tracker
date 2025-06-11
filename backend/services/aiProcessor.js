exports.processExpense = (text) => {
  const amount = text.match(/R\$(\d+\.?\d*)/)?.[1] || 0;
  const categories = {
    "almoço|jantar|restaurante": "Alimentação",
    "gasolina|uber|ônibus": "Transporte"
  };
  const category = Object.entries(categories).find(([key]) => 
    new RegExp(key, "i").test(text)
  )?.[1] || "Outros";
  
  return { amount: parseFloat(amount), category };
};