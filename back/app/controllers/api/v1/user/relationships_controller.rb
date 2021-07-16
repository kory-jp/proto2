class Api::V1::User::RelationshipsController < Api::V1::User::Base

  def following_by
    @@current_user = current_user
    if current_user.active_relationships.find_by(follower_id: params[:user_id]).present?
      render json: true
    else
      render json: false
    end
  end

  def create
    follow = current_user.active_relationships.build(follower_id: params[:user_id])
    if follow.save
      render json: true
    end
  end

  def destroy 
    follow = @@current_user.active_relationships.find_by(follower_id: params[:user_id])
    if follow.destroy
      render json: false
    end
  end
end