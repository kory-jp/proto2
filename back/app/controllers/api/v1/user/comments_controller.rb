class Api::V1::User::CommentsController < Api::V1::User::Base
  def comments_index
    post = Post.find(params[:id])
    @comments = post.comments.page(params[:page] ||=1).per(10)
    render 'comments_index', formats: :json, handlers: 'jbuilder'
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
      post = comment.post
      post.create_notification_comment!(current_user, comment.id)
    end
  end

  def edit
    comment = Comment.find(params[:id])
    render json: comment
  end

  def update
    comment = Comment.find(params[:id])
    if comment.user_id == current_user.id
      comment.update(comment_params)
      if comment.save
        render json: comment
      end
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if current_user.id == comment.user_id
      comment.destroy
      render status: 200
    else
      render status: 400
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:post_id, :user_id, :comment)
  end
end
