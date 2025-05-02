window.addEventListener("DOMContentLoaded", () => {
  const pokemonStored = JSON.parse(localStorage.getItem("save")) || [];  
  pokemonStored.forEach((pokemon) => {
    console.log(pokemon);

    // Create the Pokémon wrapper
    const pokemonContainer = document.createElement("div");
 
    const pokemonForm = document.createElement("form");
    pokemonForm.classList.add(
      "flex",
      "flex-wrap",
      "bg-white",
      "w-100",
      "m-2",
      "rounded-xl",
      "shadow-sm"
    );

    // Create the Pokémon image element
    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokemon.image;
    pokemonImg.classList.add("h-36", "w-36", "my-auto", "ml-2");
    
    // Create the Pokémon name element
    const pokemonInfoContainer = document.createElement("div");
    pokemonInfoContainer.classList.add("ml-2", "mt-5", "mb-6", "text-xl");

    // Create the Pokémon ID element
    const pokemonID = document.createElement("p");
    pokemonID.classList.add("text-sm");
    pokemonID.textContent = `ID: ${pokemon.id}`;

    // Create the Pokémon type element
    const pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.name;
    pokemonName.classList.add("uppercase", "mb-2");

    const pokemonTypePlain = document.createElement("p");
    pokemonTypePlain.classList.add("text-sm", "-mb-1");
    pokemonTypePlain.textContent = `TYPE:`;

    const pokemonType = document.createElement("p");
    pokemonType.classList.add("uppercase");
    pokemonType.textContent = pokemon.type;

    // Create the Pokémon notes textarea
    const pokemonNotes = document.createElement("textarea");
    pokemonNotes.name = "notes";
    pokemonNotes.id = pokemon.id + "notes";
    pokemonNotes.placeholder = `Take some notes about ${pokemon.name} here`;
    pokemonNotes.textContent = pokemon.notes;
    pokemonNotes.classList.add(
      "w-100",
      "h-30",
      "m-2",
      "mt-1",
      "p-2",
      "pl-3",
      "bg-blue-100",
      "rounded-lg",
      "resize-none",
      "uppercase"
    );

    // Create the submit button
    const submitNotes = document.createElement("button");
    submitNotes.type = "button";
    submitNotes.value = "submit";
    submitNotes.id = "submit";
    submitNotes.textContent = "Save notes";
    submitNotes.classList.add(
      "w-100",
      "h-10",
      "uppercase",
      "rounded-lg",
      "bg-blue-300",
      "m-2",
      "mt-0",
      "hover:bg-blue-500",
      "duration-200"
    );

    // Append elements to the DOM
    pokemonForm.appendChild(pokemonImg);
    pokemonContainer.appendChild(pokemonForm);
    pokemonForm.appendChild(pokemonInfoContainer);
    pokemonInfoContainer.appendChild(pokemonID);
    pokemonInfoContainer.appendChild(pokemonName);
    pokemonInfoContainer.appendChild(pokemonTypePlain);
    pokemonInfoContainer.appendChild(pokemonType);
    pokemonWrapper.appendChild(pokemonContainer);
    pokemonForm.appendChild(pokemonNotes);
    pokemonForm.appendChild(submitNotes);

    // Add event listener to the submit button
    submitNotes.addEventListener("click", () => {
      addNotes(pokemon.id);
    });

    // Function to add notes to local storage
    function addNotes(id) {
      const pokemonStored = JSON.parse(localStorage.getItem("save")) || [];
      const updatedPokemon = pokemonStored.map((pokemon) => {
        if (id === pokemon.id) {
          return { ...pokemon, notes: pokemonNotes.value };
        }
        return pokemon;
      });

      localStorage.setItem("save", JSON.stringify(updatedPokemon));
    }
  });
});
