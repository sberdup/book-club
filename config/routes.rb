Rails.application.routes.draw do
  resources :book_elements
  resources :storylines
  resources :themes
  resources :quotes
  resources :items
  resources :eras
  resources :events
  resources :groups
  resources :characters
  resources :locations
  resources :club_books
  resources :collections
  resources :books
  resources :club_users
  resources :clubs
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) {!req.xhr? && req.format.html?}
end
