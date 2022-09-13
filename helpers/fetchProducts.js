const fetchProducts = async (query) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const request = await fetch(url);
    const json = await request.json();
    return json;
    } catch (error) {
    throw new Error(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
