Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :user do
        root "top#index"
        post '/signup', to: "registrations#signup"
        post '/login', to: 'sessions#login'
        delete '/logout', to: 'sessions#logout'
        get '/logged_in', to: 'sessions#logged_in?'
        post '/search', to: 'search#search'
        resources :accounts, only: [:show, :edit] do
          member do
            get :myposts
            get :favorite_posts
          end
          collection do
            patch :update
            resource :relationships, only: [:create] do
              post :following_by
              patch :destroy
            end
            get :follows
            get :followers
          end
        end
        resources :users, only: [:show] do
          member do
            get :posts
            get :favorite_posts
            get :follows
            get :followers
          end
        end
        resources :posts do
          member do
            get :auth
          end
          resource :favorites, only: [ :create, :destroy] do
            member do
              get :favorited_by
            end
          end
        end
        resources :comments, only: [:create, :edit, :update, :destroy] do
          member do
            get :comments_index
          end
        end
        resources :tags, only: [:index, :show] do
          collection do
            post :search
          end
        end
        post 'entries/check', to: 'entries#check'
        resources :rooms
        resources :messages
      end

      namespace :admin do
        root "top#index"
      end
    end
  end
end
