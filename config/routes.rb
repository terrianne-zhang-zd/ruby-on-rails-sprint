Rails.application.routes.draw do
  resources :members, only: [:create, :index, :update, :destroy]
  root 'home#index'
end
