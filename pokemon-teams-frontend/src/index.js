const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const MAIN_TAG = document.getElementsByTagName("main");

function makePokemonIdPokebutton(id) {
	pokebutton = document.createElement("button");
	pokebutton.className = `release pokemon-${id}`;
	return fetch(`${POKEMONS_URL}/${id}`).then(function(pokemon) {
		let pokeAttr = pokemon.data.attributes;
		pokebutton.innerText = `${pokeAttr.nickname}(${pokeAttr.species})`;
		return pokebutton;
	});
}

function makeTrainerCard(trainer) {
	let card = document.createElement("div");
	card.className = `card trainer-${trainer.id}`;

	let trainerName = document.createElement("p");
	trainerName.innerText = trainer.attributes.name;
	card.appendChild(trainerName);

	let addPokebutton = document.createElement("button");
	addPokebutton.id = `add-pokemon-button-trainer-${trainer.id}`;
	addPokebutton.innerText = "Add Pokemon";
	card.appendChild(addPokebutton);

	for (let pokemon of trainer.relationships.pokemons.data) {
		makePokemonIdPokebutton(pokemon.id).then(function(pokebutton) {
			card.appendChild(pokebutton);
		});
	}
}

fetch(TRAINERS_URL).then(function(response) {
	return response.json();
}).then(function(json) {
	for (let trainer of json.data) {
		makeTrainerCard(trainer);
	}
});