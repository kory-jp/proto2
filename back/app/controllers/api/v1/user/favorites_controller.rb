class Api::V1::User::FavoritesController < Api::V1::User::Base

  def favorited_by
    post = Post.find(params[:post_id])
    if post.favorites.where(user_id: current_user.id).exists?
      render json: true
    else
      render json: false
    end
  end

  def create
    favorite = current_user.favorites.build(post_id: params[:post_id])
    if favorite.save
      render json: true
      post = Post.find(params[:post_id])
      post.create_notification_favorite!(current_user)
    end
  end

  def destroy
    favorite = Favorite.find_by(post_id: params[:post_id], user_id: current_user.id)
    favorite.destroy
    render json: false
  end
end
