Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :user do
        root "top#index"
        post '/signup', to: "registrations#signup"
        post '/login', to: 'sessions#login'
        delete '/logout', to: 'sessions#logout'
        get '/logged_in', to: 'sessions#logged_in?'
        resources :accounts, only: [:show, :edit] do
          member do
            get :myposts
          end
          collection do
            patch :update
          end
        end
        resources :users, only: [:show] do
          member do
            get :posts
          end
        end
        resources :posts do
          member do
            get :auth
          end
        end
        resources :comments, only: [:create, :update, :destroy] do
          member do
            get :comments_index
          end
        end
        resources :tags, only: [:index, :show] do
          member do
            get :search
          end
        end
      end

      namespace :admin do
        root "top#index"
      end
    end
  end
end
