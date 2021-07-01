class Api::V1::User::UsersController < Api::V1::User::Base
  def show
    user = User.find(params[:id])
    render json: user
  end

  def posts
    user = User.find(params[:id])
    posts = user.posts.where(user_id: user.id).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    page_length = posts.page(1).per(10).total_pages
    postsArray = []
    posts.each do |post|
      postObj = {}
      postObj["id"] = post.id
      postObj["user_id"] = post.user_id
      postObj["title"] = post.title
      postObj["content"] = post.content
      postObj["image"] = post.image
      postObj["created_at"] = post.created_at.strftime('%Y/%m/%d')
      postsArray.push(postObj)
    end
    data = {
      'posts': postsArray,
      'page_length': page_length
    }
    render json: data
  end
end
