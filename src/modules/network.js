const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch Pokémon data from the API
const fetchPokemon = async (searchPokemon) => {
  if (searchPokemon) {
    const searchResult = await fetch(pokemonURL + searchPokemon);

    // Check if the response is ok 
    if (!searchResult.ok) {
      throw new Error(`HTTP error! status:${searchResult.status}`);
    }
    const data = await searchResult.json();
    return data;
  } else {
    try {
      const res = await fetch(pokemonURL);
      if (!res.ok) {
        throw new Error("HTTP error! status: ${res.status}");
      }
      const data = await res.json();
      const pokemonArray = data.results;

      // Create an array of promises to fetch each Pokémon's details
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
