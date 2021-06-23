class Api::V1::User::SessionsController < Api::V1::User::Base
  # before_action :current_user

  def login
    @user = User.find_by(email: session_params[:email])

    if @user && @user.authenticate(session_params[:password])
      login!
      current_user
      render json: {
        logged_in: true,
        user: {
         id: @user.id,
         name: @user.name,
         nickname: @user.nickname,
         email: @user.email,
         introduction: @user.introduction,
         image: @user.image_data,
         password_digest: @user.password_digest
        }
      }
    else
      render json: {status: 401, errors: ['認証に失敗しました', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。']}
    end
  end

  def logout
    reset_session
    render json: {status: 200, logged_out: true}
  end

  def logged_in?
    if @current_user
      current_user
      render json: {
        logged_in: true, 
        user: {
          id: current_user.id,
          name: current_user.name,
          nickname: current_user.nickname,
          email: current_user.email,
          introduction: current_user.introduction,
          image: current_user.image_data,
        }
      }
    else
      render json: {logged_in: false, message: 'ユーザーが存在しません'}
    end
  end

  private
  def session_params
    params.require(:user).permit( :email, :password)
  end
end
