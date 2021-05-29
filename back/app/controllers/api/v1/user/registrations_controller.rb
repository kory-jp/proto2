class Api::V1::User::RegistrationsController < Api::V1::User::Base

  def signup
    @user = User.new(registrations_params)

    if @user.save
      login!
      # render json: { status: :created, user: @user }
      render json: {
        status: :created,
        user: {
         id: @user.id,
         name: @user.name,
         email: @user.email,
         password_digest: @user.password_digest
        }
      }
    else
      render json: {status: 500}
    end
  end

  private
  def registrations_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
