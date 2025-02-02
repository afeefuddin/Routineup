Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  #
  namespace :public do
    namespace :api do
      resources :signup
      resources :login, only: [:create]
    end
  end

  namespace :api do
    resources :user
    resources :educator
    resources :subjects
    resources :group
    resources :lecture do
      member do
        put :cancel
      end
    end
    resources :invite
  end
end
