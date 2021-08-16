class Api::V1::User::UsersController < Api::V1::User::Base
  def show
    user = User.find(params[:id])
    render json: user
  end

  def posts
    user = User.find(params[:id])
    @posts = user.posts.where(user_id: user.id).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'posts', formats: :json, handlers: 'jbuilder'
  end

  def favorite_posts
    user = User.find(params[:id])
    favorite_posts = user.favorite_posts
    @posts = favorite_posts.page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'favorite_posts', formats: :json, handlers: 'jbuilder'
  end
  
  def follows
    user = User.find(params[:id])
    @users = user.followings
    #@users.total_pages=> ActionView::Template::Error (undefined method `total_pages' )
    @page_length = @users.page(1).per(10).total_pages
    render 'follows', formats: :json, handlers: 'jbuilder'
  end

  def followers
    user = User.find(params[:id])
    @users = user.followers
    @page_length = @users.page(1).per(10).total_pages
    render 'followers', formats: :json, handlers: 'jbuilder'
  end

end
