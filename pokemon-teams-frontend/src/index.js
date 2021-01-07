const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

function fetchTrainers() {
     fetch(TRAINERS_URL)
      .then(resp => resp.json())
      .then(json => renderTrainers(json));
  }


  function renderTrainers(trainers) {
    trainers.forEach(trainer => {
      const div = document.createElement('div')
     div.classList.add('card');
     let p = document.createElement('p')
     p.innerHTML = trainer.name
     p.setAttribute('data-id' , trainer.id); 
    
     let btn = document.createElement('button')
     btn.setAttribute('data-trainer-id' , trainer.id); 
     btn.innerHTML = "Add Pokemon"
     btn.addEventListener("click", checkPokemonAmount)


     let ul = document.createElement('ul')
     trainerPokemon = trainer.pokemons  
     for (pokemon of trainerPokemon) {
         let li = document.createElement('li')
         li.innerHTML = pokemon.nickname
         let releaseBtn = document.createElement('button')
        releaseBtn.classList.add('release');
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id); 
        releaseBtn.innerHTML = "Release"
        releaseBtn.addEventListener("click", releasePokemon)
        li.appendChild(releaseBtn)
        ul.appendChild(li)
     }

    div.appendChild(p)
     div.appendChild(btn)
     div.appendChild(ul)
    main.appendChild(div)
    })
  }

  function addPokemon(id){
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Accepts': 'application/json'},
        body: JSON.stringify({
            trainer_info: {
            trainer_id: id
            }
        })
    })
    .then(resp => resp.json())
    .then(function(pokemon) {
        console.log(pokemon)
        let ul = document.querySelectorAll(".card")[id - 1].querySelector('ul')
        let li = document.createElement("li")
        li.innerHTML = pokemon.nickname
        let releaseBtn = document.createElement('button')
        releaseBtn.classList.add('release');
        releaseBtn.setAttribute('data-pokemon-id' , pokemon.id); 
        releaseBtn.innerHTML = "Release"
        releaseBtn.addEventListener("click", releasePokemon)
        li.appendChild(releaseBtn)
        ul.appendChild(li)
    })
    .catch(function(error) {
        console.log(error)
    })
  }

  function releasePokemon(event) {
    const id = event.target.attributes[1].value
    console.log(event.target.parentNode)
    console.log(event.target.attributes[1])
    
    fetch(`${POKEMONS_URL}/${id}`, {
        method: 'DELETE',
       headers: {'Content-Type': 'application/json',
          'Accepts': 'application/json'},
     })
      .then(data => console.log("Deleted"))
     .catch(function(error) {
          console.log(error)
      })  
      event.target.parentNode.remove()
    
    //console.log(event.target)
  }



function checkPokemonAmount(event) {
    const dataTrainerID = event.target.attributes[0].value
    fetch(`${TRAINERS_URL}/${dataTrainerID}`)
    .then(resp => resp.json())
    .then(function(trainer) {
      if (trainer.pokemons.length < 6) {     
        addPokemon(dataTrainerID)
      } else {
        console.log("You have too many Pokemon, you need to release one first")
      }
    })
    .catch(function(error) {
        console.log(error)
    })
  }


  document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
  });