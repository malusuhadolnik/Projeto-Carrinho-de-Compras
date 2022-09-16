// Implemente a função getSavedCartItems que deve possuir a lógica para apenas retornar o item do localStorage
// o que o teste pede: getSavedCartItems() deve retornar localStorage.getItem('cartItems')
const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
