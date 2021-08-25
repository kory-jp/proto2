class Api::V1::User::RegistrationsController < Api::V1::User::Base

  def signup
    @user = User.new(registrations_params)
    if @user.save
      login!
      render 'signup', handlers: 'jbuilder'
    else
      render json: {status: 400}
    end
  end

  private
  def registrations_params
    params.require(:user).permit(:name, :nickname, :email, :password, :password_confirmation)
  end
end
