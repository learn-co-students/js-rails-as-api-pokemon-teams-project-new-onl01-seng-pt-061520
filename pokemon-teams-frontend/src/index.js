const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const grid = document.querySelector('main')
const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}

function parseJSON(res) {
    return res.json()
}

function createPokemonLi(pokemon) {
    const teamMember = document.createElement('li')
    teamMember.innerText = pokemon.nickname
    const releaseButton = document.createElement('button')
    releaseButton.classList.add('release')
    releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
    releaseButton.innerText = "Release"
    releaseButton.addEventListener('click', releasePokemon)
    teamMember.appendChild(releaseButton)
    return teamMember
}

function addPokemon(e) {
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            trainer_id: parseInt(e.target.getAttribute('data-trainer-id'))
        })
    })
    .then(parseJSON)
    .then(pokemon => {
        const listItem = createPokemonLi(pokemon)
        const teamUl = document.querySelector(`[data-id="${pokemon.trainer_id}"]`).querySelector('ul')
        teamUl.appendChild(listItem)
    })
    .catch(error => alert("Cannot add more than 6 Pokemon"))
}

function releasePokemon(e) {
    fetch((POKEMONS_URL + `/${e.target.getAttribute('data-pokemon-id')}`), {
        method: 'DELETE', 
        headers,
        body: JSON.stringify(e.target.getAttribute('data-pokemon-id')) 
    })
    .then(parseJSON)
    .then(poke => {
        const deletedPokemon = document.querySelector(`[data-pokemon-id="${poke.id}"]`)
        const pokeList = deletedPokemon.parentElement
        pokeList.parentElement.removeChild(pokeList)
    })
}


//make team card
function createCard(trainer) {
    div = document.createElement('div')
    div.classList.add('card')
    div.setAttribute('data-id', `${trainer.id}`)

    let elementArray = []
    //create elements
    //trainer name
    const trainerName = document.createElement('p')
    trainerName.innerText = `${trainer.name}`
    //add button
    const addButton = document.createElement('button')
    addButton.setAttribute('data-trainer-id', `${trainer.id}`)
    addButton.innerText = "Add Pokemon"
    addButton.addEventListener('click', addPokemon)
    //pokemon list
    const pokemonList = document.createElement('ul')
    //add each pokemon to list
    trainer.pokemons.forEach(pokemon => {
        const listItem = createPokemonLi(pokemon)
        pokemonList.appendChild(listItem)
    })
    //create array
    elementArray.push(trainerName, addButton, pokemonList)
    //append array
    elementArray.forEach(element => {
        div.appendChild(element)
    })
    //append card
    grid.appendChild(div)
}

//get & render all teams upon
function renderTeams() {
    fetch(TRAINERS_URL)
    .then(parseJSON)
    .then(trainers => {
        trainers.forEach(trainer => {
            createCard(trainer)
        });
    })
}

renderTeams()

