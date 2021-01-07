class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon =  Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
            render json: pokemon
        else    
            render json: {
                error: "No such user; check the submitted email address",
                status: 418
            }, status: 418
        end
    end
    
    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end

end
