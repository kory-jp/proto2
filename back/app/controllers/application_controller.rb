class ApplicationController < ActionController::API
  skip_before_action :verify_authenticity_token, raise: false
  # protect_from_forgery :except => :complete, :with => :exception
  # protect_from_forgery with: :null_session
  # skip_forgery_protection
  # before_action :check_xhr_header
  include ActionController::Helpers
  include ActionController::Cookies 

  # private 
  # def check_xhr_header
  #   return if request.xhr?
  #   render json: {error: 'forbidden'}, status: :forbidden
  # end
end
