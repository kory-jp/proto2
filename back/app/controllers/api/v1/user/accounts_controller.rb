class Api::V1::User::AccountsController < Api::V1::User::Base

  def show
    user = current_user
    render json: user
  end

  def myposts
    user = current_user
    posts = user.posts.where(user_id: current_user.id).page(params[:page] ||=1).per(10).order(created_at: "DESC")
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

  def edit
    user = User.find(params[:id])
    if user.id == current_user.id
      render json: user
    end
  end

  def update
    user = User.find(params[:user][:id])
    if user.update(user_params)
      render json: user
    else
      render json: {status: 500}
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:id, :name, :email, :nickname, :introduction, :image_data)
  end
end
