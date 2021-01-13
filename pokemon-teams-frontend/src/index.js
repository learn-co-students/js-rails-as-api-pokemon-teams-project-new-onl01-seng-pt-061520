const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const headers = {
    'Content-Type': 'application/json',
    'Accepts': 'application/json'
  }
  
function parseJSON(resp) {
    return resp.json()
}
  
function renderTrainers(trainers) {
    trainers.forEach(trainer => {
      const card = document.createElement('div')
      const name = document.createElement('h2')
      const addBtn = document.createElement('BUTTON')
      const pokemonList = document.createElement('ul')
  
      card.setAttribute('class', 'card')
      card.setAttribute('data-id', trainer.id)
      name.innerText = trainer.name
      addBtn.innerHTML = "Add Pokemon"
      addBtn.setAttribute('data-trainer-id', trainer.id)
      addBtn.addEventListener('click', checkPartySize)
  
      main.appendChild(card)
      card.appendChild(name, addBtn)
      card.appendChild(addBtn)
      card.appendChild(pokemonList)
  
      renderPokemon(trainer.pokemons, pokemonList)
    });
}
  
function renderPokemon(pkmn, pokemonList) {
    pkmn.forEach(pokemon => {
      const li = document.createElement('li')
      const removeBtn = document.createElement('button')
  
      li.innerText = `${pokemon.nickname} (${pokemon.species})`
      removeBtn.innerHTML = "Release"
      removeBtn.setAttribute('class', 'release')
      removeBtn.setAttribute('data-pokemon-id', pokemon.id)
      removeBtn.addEventListener('click', releasePokemon)
  
      pokemonList.appendChild(li)
      li.appendChild(removeBtn)
    });
}
  
function catchError(error) {
    console.log(error)
}
  
function checkPartySize(event) {
    const id = event.target.attributes[0].value
  
    fetch(`${TRAINERS_URL}/${id}`)
    .then(parseJSON)
    .then(function(trainer) {
  
      if (trainer.pokemons.length < 6) {     
        addPokemon(id)
      } else {
        console.log("Party Size Reached, Release a Pokemon first")
      }
    })
    .catch(catchError)
}
  
function addPokemon(id) {
    const body = {
      trainer_info: {
        trainer_id: id
      }
    }
  
    fetch(POKEMONS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(parseJSON)
    .then(function(pokemon) {
      const ul = document.querySelectorAll(".card")[id - 1].querySelector('ul')
      const li = document.createElement("li")
      const removeBtn = document.createElement('button')
  
      li.innerText = `${pokemon.nickname} (${pokemon.species})`
      removeBtn.innerHTML = "Release"
      removeBtn.setAttribute('class', 'release')
      removeBtn.setAttribute('data-pokemon-id', pokemon.id)
      removeBtn.addEventListener('click', releasePokemon)
  
      ul.appendChild(li)
      li.appendChild(removeBtn)
    })
    .catch(catchError)
}
  
function releasePokemon(event) {
    const id = event.target.attributes[1].value
  
    fetch(`${POKEMONS_URL}/${id}`, {
      method: 'DELETE',
      headers
    })
    .then(data => console.log("Deleted"))
    .catch(catchError)
  
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
}
  
fetch(TRAINERS_URL)
.then(parseJSON)
.then(renderTrainers)
.catch(catchError)