// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const { fetchProducts } = require("./helpers/fetchProducts");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
 // const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
};

const containsCartItems = document.querySelector('.cart__items');

// requisito 5 
const cartItemClickListener = (event) => {
   containsCartItems.removeChild(event.target);
};

// veio pronta
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener); 
  return li;
};

// requisito 4 
const funcAddToCart = async (event) => { // 
  const productId = event.target.parentNode.firstChild.innerText;
  const itemJson = await fetchItem(productId);
  const { id, title, price } = itemJson;
  containsCartItems.appendChild(createCartItemElement({ id, title, price }));
};

// Requisito 2 - refatorada devido aos requisitos 4 e 8 (adição de eventListener,funcAddToCart e saveCartItems)
const addProducts = async () => {
 const getJson = await fetchProducts('computador');
 const place = document.querySelector('.items');
 
 getJson.results.forEach((element) => { 
  const { id, title, thumbnail } = element;
  product = createProductItemElement({ id, title, thumbnail }); 
  // product.querySelector('.item__add').addEventListener('click', funcAddToCart); // linha anterior ao requisito 8.foi refatorada, checar linha abaixo.
  product.querySelector('.item__add').addEventListener('click', async (event) => { // Importante: para pegar o elemento ao qual vamos adicionar o escutador de click, no caso os buttons, estes obviamente já precisam estar criados.Por isso o escutador foi add aqui
    await funcAddToCart(event);
    // requisito 8: resolução inspirada na aula Casa de Câmbio
    const cartItem = containsCartItems.innerHTML;
    saveCartItems(cartItem);
    });
  place.appendChild(product);
  });
};

const cleanCart = () => {
  const emptyBtn = document.querySelector('.empty-cart');
  emptyBtn.addEventListener('click', () => {
  containsCartItems.innerHTML = ' ';
  localStorage.removeItem('cartItems');
  });
};

window.onload = () => { 
  addProducts();
  // requisito 8: traz do local storage e pões na tela
  const getInStorage = getSavedCartItems();
  containsCartItems.innerHTML = getInStorage; 
  // requisito 8: remove do carrinho os itens carregados do local storage. Desenvolvida com ajuda da monitoria
  const allLis = document.querySelectorAll('.cart__item');
  console.log(allLis);
  allLis.forEach((singleLi) => {
    singleLi.addEventListener('click', (element) => {
      element.target.remove();
    });
  });
  cleanCart();
};
