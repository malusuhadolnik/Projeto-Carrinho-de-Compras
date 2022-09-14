const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test ('se a execução da função saveCartItems com um cartItem como argumento chama o método localStorage.setItem', async () => {
    await saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test ('se a execução da função saveCartItems com um argumento cartItem chama o método localStorage.setItem com dois parâmetros, sendo o primeiro a chave cartItems, e o segundo o valor passado como argumento para saveCartItems', async () => {
    await saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItem');
  });
});
// Methods are functions stored as object properties.(https://www.w3schools.com/js/js_object_methods.asp)