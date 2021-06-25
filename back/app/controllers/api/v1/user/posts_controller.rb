class Api::V1::User::PostsController < Api::V1::User::Base
  
  def index
    posts = Post.all.order(created_at: "DESC")
    postsArray = []
    posts.each do |post|
      postObj = {}
      postObj["id"] = post.id
      postObj["user_id"] = post.user_id
      postObj["title"] = post.title
      postObj["content"] = post.content
      postObj["image"] = post.image
      postObj["created_at"] = post.created_at.strftime('%Y/%m/%d')
      user = User.find_by(id: post.user_id)
      user_name = user.name
      postObj["name"] = user_name
      postsArray.push(postObj)
    end
    render json: postsArray
  end

  def show
    post = Post.find(params[:id])
    postObj = {}
    postObj["id"] = post.id
    postObj["user_id"] = post.user_id
    postObj["title"] = post.title
    postObj["content"] = post.content
    postObj["image"] = post.image
    postObj["created_at"] = post.created_at.strftime('%Y/%m/%d')
    user = User.find_by(id: post.user_id)
    user_name = user.name
    postObj["name"] = user_name
    user_icon = user.image_data
    postObj["user_icon"] = user_icon
    render json: postObj
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: {status: 200, post: post}
    else
      render json: {status: 500}
    end
  end

  def auth
    post = Post.find(params[:id])
    if post.user_id == @current_user.id
      render json: true
    else
      render json: false
    end
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
    if post.save
      render json: {status: 200, post: post}
    else
      render json: {status: 500}
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
  end

  private
  def post_params
    params.require(:post).permit(:user_id, :title, :content, :image)
  end
end