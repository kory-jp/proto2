class Api::V1::User::AccountsController < Api::V1::User::Base

  def myposts
    @posts = current_user.posts.eager_load(:tags, :post_tag_relations).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'myposts', handlers: 'jbuilder'
  end

  def favorite_posts
    @posts = current_user.favorite_posts.eager_load(:user, :tags ).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'favorite_posts', handlers: 'jbuilder'
  end

  def edit
    @user = User.find(params[:id])
    if @user === current_user
      render 'edit', handlers: 'jbuilder'
    else
      render json: {message: "正しいアカウントでログインしてください"}
    end
  end
  
  def update
    if current_user.update(user_params)
      render 'update', handlers: 'jbuilder'
    else
      render json: {message: "入力項目に誤りがあります"}
    end
  end

  def password
    if current_user.authenticate(params[:user][:previous_password])
      if current_user.update(user_password_params)
        render 'password', handlers: 'jbuilder'
      else
        render json: {message: "入力されたパスワードと確認用パスワードが一致しません"}
      end
    else
      render json: {message: "現在のパスワードに誤りがあります"}
    end
  end

  def follows
    @users = current_user.followings.page(1).per(10)
    render 'follows', handlers: 'jbuilder'
  end

  def followers
    @users = current_user.followers.page(1).per(10)
    render 'followers', handlers: 'jbuilder'
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
