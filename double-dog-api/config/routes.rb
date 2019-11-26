Rails.application.routes.draw do
  resources :player_turns
  resources :turns
  resources :games
  resources :dares
  resources :players
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
