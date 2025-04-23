const pokemonContainer = document.getElementById("pokemonWrapper");

// display pokemon function
const displayCard = (pokemon) => {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add(
    "flex",
    "bg-white",
    "min-w-100",
    "m-2",
    "rounded-xl",
    "shadow-sm"
  );

  const pokemonImg = document.createElement("img");
  pokemonImg.src = pokemon.sprites.back_default;
  pokemonImg.classList.add("h-36", "w-36", "my-auto");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemon.name;
  pokemonName.classList.add("mb-2");

  const pokemonInfoContainer = document.createElement("div");
  pokemonInfoContainer.classList.add("ml-5", "mt-5", "text-xl");

  const pokemonInfo = document.createElement("p");
  pokemonInfo.classList.add("mb-1");
  pokemonInfo.textContent = `ID : ${pokemon.id} | Name : ${pokemon.name}`;

  const pokemonInfoType = document.createElement("p");
  pokemonInfoType.classList.add("mb-6");
  pokemonInfoType.textContent = `Type : ${pokemon.type}`;

  const button = document.createElement("button");
  button.classList.add(
    "self-start",
    "ml-auto",
    "mt-2",
    "mr-2",
    "bg-red-300",
    "p-2",
    "rounded-lg",
    "hover:bg-red-500",
    "duration-200"
  );

  const image = document.createElement("img");
  image.src = "https://cdn-icons-png.flaticon.com/512/105/105220.png";
  image.classList.add("w-8", "h-8", "invert");

  button.appendChild(image);
  pokemonCard.appendChild(pokemonImg);
  pokemonCard.appendChild(pokemonInfoContainer);
  pokemonInfoContainer.appendChild(pokemonName);
  pokemonInfoContainer.appendChild(pokemonInfo);
  pokemonInfoContainer.appendChild(pokemonInfoType);
  pokemonCard.appendChild(button);

  pokemonContainer.appendChild(pokemonCard);
};
// displayCard(pokemon);

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

fetchPokemon();
