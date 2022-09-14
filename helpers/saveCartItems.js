// Implemente a função saveCartItems que deve possuir a lógica para apenas adicionar o item no localStorage em uma chave chamada cartItems;
// o teste pediu que a função fosse chamada com o argumento cartItem
// e saveCartItems('cartItem') deve retornar localStorage.setItem('cartItems', 'cartItem');
const saveCartItems = async (cartItem) => {
  localStorage.setItem('cartItems', cartItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
// dúvidas! onde eu chamo esta função?? onde estabeleço o cart item???