class Api::V1::User::RegistrationsController < Api::V1::User::Base
  skip_before_action :authenticate_user

  def signup
    @user = User.new(registrations_params)

    if @user.save
      login!
      render json: @user
    end
  end

  private
  def registrations_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
