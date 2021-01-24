const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    
    fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
       let mainOne = document.querySelector("main");
       for (const i of json) {
           let cardDiv = document.createElement("div");
           cardDiv.className = 'card';
           let newTrainer = document.createElement("h3");
           newTrainer.innerHTML = i["name"]
           cardDiv.appendChild(newTrainer)
           let addPokemon = document.createElement("button");
           cardDiv.appendChild(addPokemon);
           addPokemon.innerHTML = "Add Pokemon";
           let allPokemon = document.createElement("ul");
            
           allPokemon.className = "pokemon";
           cardDiv.appendChild(allPokemon);

           addPokemon.addEventListener("click", function() {
                
                 fetch(POKEMONS_URL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json){
                    let randomPokemon = json[Math.floor(Math.random() * json.length) + 1]
                    let newPokemon = document.createElement("li");
                    let release = document.createElement("button");
                    release.className = "release";
                    newPokemon.innerHTML = `${randomPokemon["nickname"]} (${randomPokemon["species"]})`;
                    allPokemon.appendChild(newPokemon);
                    release.innerHTML = "release";
                    allPokemon.appendChild(release);
                    
                    
                })
           
                
        });
            // release.addEventListener("click", function() {
// let configurationObject = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       nickname: 
//     })
//   };
            // })
           mainOne.appendChild(cardDiv);
        };
    
    })
});
