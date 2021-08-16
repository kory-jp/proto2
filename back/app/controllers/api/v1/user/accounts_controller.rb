class Api::V1::User::AccountsController < Api::V1::User::Base

  def myposts
    @posts = current_user.posts.page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'myposts', formats: :json, handlers: 'jbuilder'
  end

  def favorite_posts
    favorite_posts = current_user.favorite_posts
    @posts = favorite_posts.page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'favorite_posts', formats: :json, handlers: 'jbuilder'
  end

  def edit
    user = User.find(params[:id])
    if user === current_user
      render json: user
      @@current_user = current_user
    end
  end
  
  def update
    if @@current_user.update(user_params)
      render json: @@current_user
    end
  end

  def password
    if current_user.authenticate(params[:user][:previous_password])
      if current_user.update(user_password_params)
        user = current_user
        render json: user
      end
    else
      render json: {message: "現在のパスワードに誤りがあります"}
    end
  end

  def follows
    @users = current_user.followings.page(1).per(10)
    render 'follows', formats: :json, handlers: 'jbuilder'
  end

  def followers
    @users = current_user.followers.page(1).per(10)
    render 'followers', formats: :json, handlers: 'jbuilder'
  end

  def destroy
    if current_user.authenticate(params[:user][:password])
      current_user.destroy
      reset_session
      render json: "ok"
    else
      render json: "ng"
    end
  end
  

  private
  
  def user_params
    params.require(:user).permit(:id, :name, :email, :nickname, :introduction, :image)
  end

  def user_password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
