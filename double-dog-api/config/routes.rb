Rails.application.routes.draw do
  resources :games do
  	resources :players
  	resources :turns
  end
  resources :dares
  resources :player_turns
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
