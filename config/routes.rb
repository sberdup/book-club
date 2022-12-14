Rails.application.routes.draw do
  resources :images
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
  resources :collections, except: [:show]
  resources :books
  resources :clubs
  resources :clubs do
    resources :club_users
  end
  resources :users, except: [:index, :show]
  resources :users do
    resources :collections
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # resources :sessions, only: [:create, :destroy]
  get '/me', to:'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/hello', to: 'application#hello_world'
  get '/perms/:club_id', to: 'club_users#perms'
  get '/users_search/:username', to:'users#search'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) {!req.xhr? && req.format.html?}
end
