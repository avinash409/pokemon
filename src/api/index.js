const pokemonV2Endpoint = "https://pokeapi.co/api/v2/pokemon";

export const fetchApi = async (url, params = {}, options = {}) => {
  const endpoint = new URL(url);
  Object.keys(params).forEach((key) =>
    endpoint.searchParams.append(key, params[key])
  );
  const response = await fetch(endpoint, options);
  return await response.json();
};

export const getPokemons = async (limit = 20, offset = 0) => {
  return await fetchApi(pokemonV2Endpoint, {
    limit,
    offset,
  });
};
