const displayCard = (pokemon) => {
   // Create the main card container for the Pokémon
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add(
    "flex",
    "bg-white",
    "w-120",
    "m-2",
    "rounded-xl",
    "shadow-sm"
  );

  // Create the Pokémon image element
  const pokemonImg = document.createElement("img");
  pokemonImg.src = pokemon.sprites.front_default;
  pokemonImg.classList.add("h-36", "w-36", "my-auto");

  // Create the Pokémon name element
  const pokemonName = document.createElement("h2");
  pokemonName.textContent = pokemon.name;
  pokemonName.classList.add("mb-2");

  // Create the Pokémon info container
  const pokemonInfoContainer = document.createElement("div");
  pokemonInfoContainer.classList.add("ml-5", "mt-5", "text-xl");


  // Create the Pokémon ID and type elements
  const pokemonInfo = document.createElement("p");
  pokemonInfo.classList.add("mb-1");
  pokemonInfo.textContent = `ID : ${pokemon.id}`;

  // Create the Pokémon type element
  const pokemonInfoType = document.createElement("p");
  pokemonInfoType.classList.add("mb-6");
  pokemonInfoType.textContent = `Type : ${pokemon.types.map(
    (t) => t.type.name
  )}`;

  // Create a button element
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

  // add event listener to the button
  button.addEventListener("click", function () {
    //test if the button is working
    console.log("Button clicked for:", pokemon.name);
    // creat avariable call save
    const save = JSON.parse(localStorage.getItem("save")) || [];
    //save only the necessary data
    const shortPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      type: pokemon.types.map((t) => t.type.name),
      notes: "",
    };

    // Add the selected pokemon to the array
    save.push(shortPokemon);
    // push the pokemon to the save variable
    localStorage.setItem("save", JSON.stringify(save));
  });

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

  return pokemonCard;
};

export { displayCard };
