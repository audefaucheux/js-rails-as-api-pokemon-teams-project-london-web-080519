// API FUNCTIONS

function get(url) {
  return fetch(url).then(response => response.json());
}

function post(url, pokemonData) {
  return fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(pokemonData)
  }).then(response => response.json());
}

function destroy(url, id) {
  fetch(`${url}${id}`, {
    method: "DELETE"
  });
}

API = { get, post, destroy };

// CONSTANTS
const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers/`;
const POKEMONS_URL = `${BASE_URL}/pokemons/`;
const mainTag = document.querySelector("main");
const pokemonData = { trainer_id: 1 };

// FUNCTIONS

function appendPokemon(pokemon) {
  // Get pokemon ul
  let pokemonUl = document
    .querySelector(`div.card[data-id="${pokemon.trainer_id}"]`)
    .querySelector("ul");

  // Create pokemon li
  let pokemonLi = document.createElement("li");

  // Append pokemon info
  pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
  let releaseButton = document.createElement("button");
  releaseButton.classList = "release";
  releaseButton.dataset.pokemonId = pokemon.id;
  releaseButton.innerText = "Release";
  pokemonLi.append(releaseButton);
  pokemonUl.append(pokemonLi);

  // RELEASE BUTTON EVENT LISTENER
  releaseButton.addEventListener("click", event => {
    API.destroy(POKEMONS_URL, pokemon.id);
    pokemonLi.remove();
  });
}

function getPokemons(trainer) {
  trainer.pokemons.forEach(appendPokemon);
}

function handleAddPokemon(trainer) {
  let pokemonData = {
    trainer_id: trainer.id
  };

  let liCount = document
    .querySelector(`div.card[data-id="${trainer.id}"]`)
    .querySelectorAll("li").length;

  if (liCount < 6) {
    API.post(POKEMONS_URL, pokemonData).then(appendPokemon);
  }
}

function appendTrainer(trainer) {
  let trainerDiv = document.createElement("div");
  trainerDiv.classList = "card";
  trainerDiv.dataset.id = trainer.id;

  let trainerP = document.createElement("p");
  trainerP.innerText = trainer.name;

  let addPokemonButton = document.createElement("button");
  addPokemonButton.dataset.trainerId = trainer.id;
  addPokemonButton.innerText = "Add Pokemon";

  let pokemonUl = document.createElement("ul");

  mainTag.appendChild(trainerDiv);
  trainerDiv.append(trainerP, addPokemonButton, pokemonUl);

  // GET ALL POKEMONS
  getPokemons(trainer);

  addPokemonButton.addEventListener("click", event => {
    handleAddPokemon(trainer);
  });
}

function handleTrainers(trainers) {
  trainers.forEach(appendTrainer);
}

document.addEventListener("DOMContentLoaded", event => {
  API.get(TRAINERS_URL).then(handleTrainers);
});
