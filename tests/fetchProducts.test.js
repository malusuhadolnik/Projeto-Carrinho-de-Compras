require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test ('se fetchProducts é uma função', async () => {
    await expect(typeof fetchProducts).toBe('function');
  });
  test ('se a execução da função fetchProducts com o argumento computador chama a função fetch', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test ('se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  test ('se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const retorno = await fetchProducts('computador');
    expect(retorno).toEqual(computadorSearch);
  });
  test ('se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      const dados = await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error(('You must provide an url')));
    }
  });
});
// Referencias:
// https://jestjs.io/pt-BR/docs/expect#tohavebeencalled