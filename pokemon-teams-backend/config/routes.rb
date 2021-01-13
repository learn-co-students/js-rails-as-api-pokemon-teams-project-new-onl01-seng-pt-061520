Rails.application.routes.draw do
  resources :pokemons, except: [:new, :create, :destroy]
  resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
