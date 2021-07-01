class Api::V1::User::SessionsController < Api::V1::User::Base
  skip_before_action :authenticate_user!
  
  def login
    @user = User.find_by(email: session_params[:email])
    if @user && @user.authenticate(session_params[:password])
      login!
      render json: @user
    end
  end

  def logout
    reset_session
  end

  def logged_in?
    if current_user
      render json: current_user
    end
  end

  private
  def session_params
    params.require(:user).permit( :email, :password)
  end
end
