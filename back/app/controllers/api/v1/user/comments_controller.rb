class Api::V1::User::CommentsController < Api::V1::User::Base
  def comments_index
    post = Post.find(params[:id])
    comments = post.comments.page(params[:page] ||=1).per(10)
    page_length = comments.page(1).per(10).total_pages
    commentsArray = []
    comments.each do |comment|
      commentObj = {}
      commentObj["id"] = comment.id
      commentObj["post_id"] = comment.post_id
      commentObj["user_id"] = comment.user_id
      user = User.find_by(id: comment.user_id)
      commentObj["name"] = user.name
      commentObj["nickname"] = user.nickname
      commentObj["icon"] = user.image_data
      commentObj["comment"] = comment.comment
      commentObj["created_at"] = comment.created_at.strftime('%Y/%m/%d')
      commentsArray.push(commentObj)
    end
    data = {
      'comments': commentsArray,
      'page_length': page_length
    }
    render json: data
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    end
  end

  def edit
    comment = Comment.find(params[:id])
    render json: comment
  end

  def update
    p session.to_hash
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
    comment.destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:post_id, :user_id, :comment)
  end
end
