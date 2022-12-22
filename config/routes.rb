Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root "lists#index"
  resources :lists
  resources :events
end
