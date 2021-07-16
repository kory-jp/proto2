class Api::V1::User::Base < ApplicationController
  before_action :current_user
  # before_action :authenticate_user!, except: [:new, :create, :update, :search, :signup, :destroy]
  helper_method :login!
  helper_method :current_user
  
  private
  def current_user
    if session[:user_id]
      current_user ||= 
        User.find_by(id: session[:user_id])
    end
  end
  

  def login!
    session[:user_id] = @user.id
  end

  # def authenticate_user!
  #   if @current_user == nil
  #     render json: nil
  #   end
  # end

end