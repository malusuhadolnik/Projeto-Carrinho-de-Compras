require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test ('se fetchItem é uma função', async () => {
    await expect(typeof fetchItem).toBe('function');
  });
  test ('se a execução da função fetchItem com o argumento do item MLB1615760527 chama a função fetch', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test ('se, ao chamar a função fetchItem com o argumento do item MLB1615760527, a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test ('se o retorno da função fetchItem com o argumento do item MLB1615760527 é uma estrutura de dados igual ao objeto item, que já está importado no arquivo.', async () => {
    const retorno = await fetchItem('MLB1615760527');
    expect(retorno).toEqual(item);
  });
  test ('se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      const dados = await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error(('You must provide an url')));
    }
    });
});