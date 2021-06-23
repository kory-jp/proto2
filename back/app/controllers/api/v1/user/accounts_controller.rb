class Api::V1::User::AccountsController < Api::V1::User::Base

  def show
    user = current_user
    render json: user
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
