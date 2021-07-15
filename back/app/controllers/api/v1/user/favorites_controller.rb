class Api::V1::User::FavoritesController < Api::V1::User::Base

  def favorited_by
    p session.to_hash
    post = Post.find(params[:post_id])
    if post.favorites.where(user_id: current_user.id).exists?
      render json: true
    else
      render json: false
    end
  end

  # def create
  #   binding.pry
  #   p session.to_hash
  #   favorite = current_user.favorite_posts.build(post_id: params[:post_id])
  #   favorite.save
  #   render json: true
  # end

  def create
    user = User.find(params[:favorites][:user_id])
    favorite = user.favorites.build(post_id: params[:post_id])
    if favorite.save
      render json: true
    end
  end

  def destroy
    favorite = Favorite.find_by(post_id: params[:post_id], user_id: current_user.id)
    favorite.destroy
    render json: false
  end
end
