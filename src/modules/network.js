import { displayCard } from "./ui";

const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokemonsArray = async (searchPokemon) => {
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

      const promises = pokemonArray.map(async (pokemon) => {
        console.log(pokemon.url);
        const pokemonNewUrl = pokemon.url;
        const res = await fetch(pokemonNewUrl);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        displayCard(data);
      });
    } catch (error) {
      console.error("Error fetching", error);
    }
    return;
  }
};
export { fetchPokemonsArray };
