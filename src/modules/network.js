import { displayCard } from "./ui";

// fetch pokemons function
const fetchPokemonsArray = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const pokemonArray = data.results;
    console.log(pokemonArray);
    return pokemonArray;
  } catch (err) {
    console.error("Error fetching pokemons:", err);
  }
};

const fetchPokemon = async () => {
  try {
    const pokemonArray = await fetchPokemonsArray();
    const promises = pokemonArray.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      displayCard(data);
    });
  } catch (err) {
    console.error("Error fetching pokemon:", err);
  }
};

export { fetchPokemon };
