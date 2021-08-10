class Api::V1::User::SessionsController < Api::V1::User::Base
  
  def login
    @user = User.find_by(email: session_params[:email])
    if @user && @user.authenticate(session_params[:password])
      login!
      render json: @user
    end
  end

  def logout
    if current_user
      reset_session
      $current_user = nil
    end
  end
  
  TIMEOUT = 60.minutes

  def logged_in?
    if current_user
      if session[:last_access_time] >= TIMEOUT.ago
        session[:last_access_time] = Time.current
        render json: current_user
      else
        reset_session
        render json: {message: "セッションタイムアウト"}
      end
    else
      render json: {message: "ログインしてください"}
    end
  end

  private
  def session_params
    params.require(:user).permit( :email, :password)
  end
end
