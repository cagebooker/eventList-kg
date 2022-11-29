Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  root "lists#index"
  resources :lists
  resources :events
end
