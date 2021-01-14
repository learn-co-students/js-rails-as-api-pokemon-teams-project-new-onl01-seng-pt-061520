const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAX_POKEMON = 6

const main = document.querySelector('main')

function addPokemon(pokemon, ul, trainer_id) {
  const li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`

  let releaseBtn = document.createElement('button')
  releaseBtn.className = 'release'
  releaseBtn.setAttribute('data-pokemon-id',pokemon.id)
  releaseBtn.innerText = 'Release'
  removePokemonEvent(li, releaseBtn, trainer_id, pokemon.id)

  ul.appendChild(li)
  li.appendChild(releaseBtn)
}

function addPokemonEvent(ul, button) {
  button.addEventListener('click', function(event) {
    if (ul.childElementCount < MAX_POKEMON) {
      console.log(ul)
      let trainer_id = button.getAttribute('data-trainer-id')
      console.log(button)
      console.log(trainer_id)
      createPokemon(trainer_id, ul)
    }
  })
}

function removePokemonEvent(li, button, trainer_id, pokemon_id) {
    button.addEventListener('click', function(event) {
      deletePokemon(li, trainer_id, pokemon_id)
    })
}

function buildCards(trainerObjects) {
  trainerObjects.forEach(trainerObj => {
    let card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('data-id', trainerObj.id)

    let p = document.createElement('p')
    p.innerText = trainerObj.name

    let addButton = document.createElement('button')
    addButton.setAttribute('data-trainer-id', trainerObj.id)
    addButton.innerText = 'Add Pokemon'

    let ul = document.createElement('ul')

    main.appendChild(card)
    card.appendChild(p)
    card.appendChild(addButton)
    card.appendChild(ul)

    trainerObj.pokemons.forEach(pokemon => {
      addPokemon(pokemon, ul, trainerObj.id)
    })

    addPokemonEvent(ul, addButton)

  })

}

function loadTrainers() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => buildCards(json))
}

function createPokemon(trainer_id, ul) {
  let data = {
    trainer_id: trainer_id
  }

  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }

  return fetch(POKEMONS_URL, configObj)
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      console.log(object)
      console.log('trainer_id= ' + trainer_id)
      console.log("ul= " + ul)
      addPokemon(object, ul, trainer_id)
    })
}

function deletePokemon(li, trainer_id, pokemon_id) {
  let configObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  fetch(POKEMONS_URL + "/" + pokemon_id, configObj)
    .then(function(response) {
      // response.json()
      // ^ causes end of input errror ??
      li.remove()
    })
}

loadTrainers()
