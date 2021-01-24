class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate do
    pokemon_count_valid?
  end 

  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_size, "hey that's too many")
    end 
  end 
end
