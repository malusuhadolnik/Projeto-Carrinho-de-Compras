const fetchItem = async (itemID) => {
  try {
    const url = `https://api.mercadolibre.com/items/${itemID}`;
    const request = await fetch(url);
    const json = await request.json();
    return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
