class Api::V1::User::RelationshipsController < Api::V1::User::Base

  def following_by
    if current_user.active_relationships.find_by(follower_id: params[:user_id]).present?
      render json: true
    else
      render json: false
    end
  end

  def create
    if current_user.id != params[:user_id].to_i
      follow = current_user.active_relationships.build(follower_id: params[:user_id])
      if follow.save
        render json: true
        user = User.find(params[:user_id])
        user.create_notification_follow!(current_user)
      end
    end
  end

  def destroy 
    follow = current_user.active_relationships.find_by(follower_id: params[:user_id])
    if follow.destroy
      render json: false
    end
  end
end