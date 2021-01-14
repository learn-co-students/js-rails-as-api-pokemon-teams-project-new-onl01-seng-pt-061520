class TrainersController < ApplicationController
  def index
    render json: TrainerSerializer.new(Trainer.all)
  end
end
