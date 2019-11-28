Rails.application.routes.draw do
  resources :player_turns
  resources :turns
  resources :games do
  	resources :players
  end
  resources :dares
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
