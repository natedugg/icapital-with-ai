Rails.application.routes.draw do
  namespace :api do
    resources :investors, only: [:index, :show, :create, :update]
  end
end
