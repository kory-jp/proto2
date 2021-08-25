class Api::V1::User::UsersController < Api::V1::User::Base
  def show
    @user = User.find(params[:id])
    render 'show', handlers: 'jbuilder'
  end

  def posts
    user = User.find(params[:id])
    @posts = user.posts.eager_load(:tags, :post_tag_relations).where(user_id: user.id).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'posts', handlers: 'jbuilder'
  end

  def favorite_posts
    user = User.find(params[:id])
    favorite_posts = user.favorite_posts
    @posts = favorite_posts.eager_load(:user, :tags).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'favorite_posts', handlers: 'jbuilder'
  end
  
  def follows
    user = User.find(params[:id])
    @users = user.followings.page(1).per(10)
    render 'follows', handlers: 'jbuilder'
  end

  def followers
    user = User.find(params[:id])
    @users = user.followers.page(1).per(10)
    render 'followers', handlers: 'jbuilder'
  end

end
