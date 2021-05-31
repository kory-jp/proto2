class Api::V1::User::Base < ApplicationController
  helper_method :login!
  helper_method :current_user
  before_action :current_user

  def login!
    session[:user_id] = @user.id
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_user
    if session[:user_id]
      @current_user ||= 
        User.find_by(id: session[:user_id])
    end
  end
end