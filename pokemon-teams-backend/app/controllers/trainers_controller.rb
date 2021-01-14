class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    # binding.pry
    render json: trainers.to_json(include: :pokemons)
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: trainer.to_json(include: :pokemon)
  end
end
