class PokemonsController < ApplicationController
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params[:trainer_id])
    render json: pokemon
  end
  
  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end

  private

  def pokemon_params
    params.require(:trainer_info).permit(:trainer_id)
  end
end
