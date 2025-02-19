Rails.application.routes.draw do
  # API routes
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index]
      resources :users, only: [:index]

      # Auth routes
      post "validate_email", to: "auth#validate_email"
      post "login", to: "auth#login"
      delete "logout", to: "auth#logout"
      get "logged_in", to: "auth#logged_in"
    end
  end
  # Non-API routes
  get "*path", to: "dashboard#index"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "dashboard#index"
end
