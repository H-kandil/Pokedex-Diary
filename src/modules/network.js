const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokemon = async (searchPokemon) => {
  if (searchPokemon) {
    const searchResult = await fetch(pokemonURL + searchPokemon);

    if (!searchResult.ok) {
      throw new Error(`HTTP error! status:${searchResult.status}`);
    }
    const data = await res.json();
    return data;
  } else {
    try {
      const res = await fetch(pokemonURL);
      if (!res.ok) {
        throw new Error("HTTP error! status: ${res.status}");
      }
      const data = await res.json();
      const pokemonArray = data.results;

      const promises = await Promise.all(
        pokemonArray.map(async (pokemon) => {
          const pokemonNewUrl = pokemon.url;
          const res = await fetch(pokemonNewUrl);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return await res.json();
        })
      );
      return promises;
    } catch (error) {
      console.error("Error fetching", error);
    }
  }
};
export { fetchPokemon };
