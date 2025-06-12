export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

export function isValidExpense({ description, amount, category, userId }) {
  return (
    typeof description === 'string' &&
    description.trim() !== '' &&
    typeof amount === 'number' &&
    !isNaN(amount) &&
    typeof category === 'string' &&
    category.trim() !== '' &&
    typeof userId === 'string' &&
    userId.trim() !== ''
  );
}