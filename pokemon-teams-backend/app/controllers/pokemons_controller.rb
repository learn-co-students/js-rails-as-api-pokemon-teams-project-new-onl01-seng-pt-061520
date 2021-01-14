class PokemonsController < ApplicationController

  def destroy
    # trainer = Trainer.find_by(id: params[:trainer_id])
    pokemon = Pokemon.find_by(id: params[:id])
    # binding.pry
    pokemon.destroy
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    trainer = Trainer.find_by(id: params[:trainer_id])
    new_pokemon = trainer.pokemons.build(nickname: name, species: species)
    if trainer.save
      render json: new_pokemon
    else
      render json: "error"
    end
  end

  private
  def pokemon_params
    params.permit(:name, :species, :trainer_id)

  end
end
