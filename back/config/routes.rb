Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :user do
        root "top#index"
        post '/signup', to: "registrations#signup"
        post '/login', to: 'sessions#login'
        delete '/logout', to: 'sessions#logout'
        get '/logged_in', to: 'sessions#logged_in?'
        resources :posts
      end

      namespace :admin do
        root "top#index"
      end
    end
  end
end
