class Api::V1::User::PostsController < Api::V1::User::Base
  
  def index
    posts = Post.page(params[:page] ||=1).per(10).order(created_at: "DESC")
    page_length = Post.page(1).per(10).total_pages
    postsArray = []
    posts.each do |post|
      postObj = {}
      postObj["id"] = post.id
      postObj["user_id"] = post.user_id
      postObj["title"] = post.title
      postObj["content"] = post.content
      postObj["image"] = post.image
      postObj["created_at"] = post.created_at.strftime('%Y/%m/%d')
      tagArray = []
      tags = post.tags
      tags.each do |tag|
        tagObj = {}
        tagObj["id"] = tag.id
        tagObj["value"] = tag.value
        tagObj["label"] = tag.label
        tagArray.push(tagObj)
      end
      postObj["tags"] = tagArray
      user = User.find_by(id: post.user_id)
      user_id = user.id
      postObj["userId"] = user_id
      user_name = user.name
      postObj["name"] = user_name
      user_nickname = user.nickname
      postObj["nickname"] = user_nickname
      postsArray.push(postObj)
    end
    data = {
      'posts': postsArray,
      'page_length': page_length
    }
    render json: data
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
    tagArray = []
    tags = post.tags
    tags.each do |tag|
      tagObj = {}
      tagObj["id"] = tag.id
      tagObj["value"] = tag.value
      tagObj["label"] = tag.label
      tagArray.push(tagObj)
    end
    postObj["tags"] = tagArray
    user = User.find_by(id: post.user_id)
    user_name = user.name
    postObj["name"] = user_name
    user_nickname = user.nickname
    postObj["nickname"] = user_nickname
    user_icon = user.image_data
    postObj["user_icon"] = user_icon
    render json: postObj

  end

  def create
    post = Post.new(post_params)
    if post.save!
      render json: {status: 200, post: post}
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
    if post_params[:tag_ids] === nil
      post.tags = []
    end
    post.update!(post_params)
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
    params.require(:post).permit(:user_id, :title, :content, :image, tag_ids:[])
  end
end