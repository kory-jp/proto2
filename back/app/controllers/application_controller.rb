class ApplicationController < ActionController::API
  skip_before_action :verify_authenticity_token, raise: false
  # before_action :check_xhr_header
  include ActionController::Helpers
  include ActionController::Cookies 

  private 
  # def check_xhr_header
  #   return if request.xhr?
  #   render json: {error: 'forbidden'}, status: :forbidden
  # end
end
