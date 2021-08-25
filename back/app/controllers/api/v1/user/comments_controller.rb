class Api::V1::User::CommentsController < Api::V1::User::Base
  def index
    post = Post.find(params[:post_id])
    @comments = post.comments.eager_load(:user).page(params[:page] ||=1).per(10)
    render 'comments_index', handlers: 'jbuilder'
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render 'create', handlers: 'jbuilder'
      post = @comment.post
      post.create_notification_comment!(current_user, @comment.id)
    else
      render json: {message: "入力項目に誤りがあります"}
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.user_id == current_user.id
      @comment.update(comment_params)
      if @comment.save
        render 'update', handlers: 'jbuilder'
      end
    else
      render json: {message: "編集権限がありません"}
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if current_user.id == comment.user_id
      comment.destroy
      render  json: {status: 200}
    else
      render json: {status: 400}
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:post_id, :user_id, :comment)
  end
end
