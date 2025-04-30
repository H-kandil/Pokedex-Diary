import { fetchPokemon } from "./network.js";
import { displayCard } from "./ui.js";

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

    const pokemons = await fetchPokemon();
    pokemons.forEach((pokemon) => {
      const pokemonCard = displayCard(pokemon);
      pokemonWrapper.appendChild(pokemonCard);
    });
  } catch (err) {}
};

window.addEventListener("DOMContentLoaded", async () => {
  await firstload();
});

const searchPokemon = document.getElementById("searchbar");

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

      const pokemon = await fetchPokemon(pokemonNameOrId);
      const pokemonCard = displayCard(pokemon);

      main.appendChild(pokemonResult);
      pokemonResult.appendChild(pokemonCard);
    }
  }
});
