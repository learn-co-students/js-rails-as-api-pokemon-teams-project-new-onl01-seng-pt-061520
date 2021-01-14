class PokemonsController < ApplicationController
  def show
    render json: PokemonSerializer.new(Pokemon.find_by(id: params[:id]))
  end
end
