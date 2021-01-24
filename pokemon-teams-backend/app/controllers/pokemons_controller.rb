class PokemonsController < ApplicationController
    def index 
        pokemons = Pokemon.all 
        render json: pokemons, only: [:nickname, :species]
    end

    

    def create 
        pokemon = Pokemon.find_by
end
