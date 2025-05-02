import { fetchPokemon } from "./network.js";
import { displayCard } from "./ui.js";

// Function to handle the initial loading of Pokémon data
const main = document.querySelector("main");
const firstload = async () => {
  try {
    const pokemonWrapper = document.createElement("div");
    pokemonWrapper.id = "pokemonWrapper";
    pokemonWrapper.classList.add(
      "w-3/4",
      "mt-10",
      "flex",
      "flex-wrap",
      "place-content-center",
      "mx-auto",
      "mb-10"
    );
    main.appendChild(pokemonWrapper);
// Fetch Pokémon data from the API
    const pokemons = await fetchPokemon();
    pokemons.forEach((pokemon) => {
      const pokemonCard = displayCard(pokemon);
      pokemonWrapper.appendChild(pokemonCard);
    });
  } catch (err) {}
};
// Function to handle the search functionality
window.addEventListener("DOMContentLoaded", async () => {
  await firstload();
});
const searchPokemon = document.getElementById("searchbar");
// Add event listener to the search form
searchPokemon.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pokemonWrapper = document.getElementById("pokemonWrapper");
  const pokemonNameOrId = searchinput.value.trim();

  if (pokemonNameOrId === "" && !pokemonWrapper) {
    pokemonResult.remove();
    await firstload();
  } else {
    if (!pokemonWrapper) {
      const pokemon = await fetchPokemon(pokemonNameOrId);
      const pokemonCard = displayCard(pokemon);

      const pokemonResult = document.getElementById("pokemonResult");
      const pokemonCardId = document.getElementById("pokemonCardId");

      pokemonCardId.remove();
      pokemonResult.appendChild(pokemonCard);
    } else {
      pokemonWrapper.remove();
      const pokemonResult = document.createElement("div");
      pokemonResult.id = "pokemonResult";
      pokemonResult.classList.add(
        "w-3/4",
        "mt-10",
        "flex",
        "flex-wrap",
        "place-content-center",
        "mx-auto",
        "mb-10"
      );

      // Create a new Pokémon card container
      const pokemon = await fetchPokemon(pokemonNameOrId);
      const pokemonCard = displayCard(pokemon);

     // Create a new Pokémon card and append it to the result container 
      main.appendChild(pokemonResult);
      pokemonResult.appendChild(pokemonCard);
    }
  }
});
