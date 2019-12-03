Rails.application.routes.draw do
  resources :games do
  	resources :players
  	resources :turns
  	resources :player_turns
  end
  resources :dares
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
