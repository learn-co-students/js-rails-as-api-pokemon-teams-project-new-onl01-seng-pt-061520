class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers
    end
    
    def show
        trainer = Trainer.find_by(id: params[:id])
        if trainer
            render json: trainer
        else
            render json: { message: 'No trainer found with that id' }
        end
    end   
end
