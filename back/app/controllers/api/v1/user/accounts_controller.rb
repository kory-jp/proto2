class Api::V1::User::AccountsController < Api::V1::User::Base

  def show
    user = current_user
    render json: user
  end

  def edit
    user = User.find(params[:id])
    if user.id == current_user.id
      render json: {
        auth: true,
        user: {
          id: user.id,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          introduction: user.introduction,
          image_data: user.image_data,
          password_digest: user.password_digest
        }
      }
    else
      render json: {auth: false}
    end
  end

  def update
    user = User.find(params[:user][:id])
    if user.update(user_params)
      render json: user
    else
      render json: {status: 500}
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:id, :name, :email, :nickname, :introduction, :image_data)
  end
end
