class Api::V1::User::AccountsController < Api::V1::User::Base

  def myposts
    posts = current_user.posts.page(params[:page] ||=1).per(10).order(created_at: "DESC")
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
      postsArray.push(postObj)
    end
    data = {
      'posts': postsArray,
      'page_length': page_length
    }
    render json: data
  end

  def favorite_posts
    favorite_posts = current_user.favorite_posts
    posts = favorite_posts.page(params[:page] ||=1).per(10).order(created_at: "DESC")
    page_length = posts.page(1).per(10).total_pages
    postsArray = []
    posts.each do |post|
      postObj = {}
      postObj["id"] = post.id
      postObj["user_id"] = post.user_id
      user = User.find_by(id: post.user_id)
      user_nickname = user.nickname
      postObj["nickname"] = user_nickname
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
    if user === current_user
      render json: user
      @@current_user = current_user
    end
  end
  
  def update
    if @@current_user.update(user_params)
      render json: @@current_user
    end
  end

  def follows
    users = current_user.followings
    page_length = users.page(1).per(10).total_pages
    usersArray = []
    users.each do |user|
      userObj = {}
      userObj["id"] = user.id
      userObj["name"] = user.name
      userObj["nickname"] = user.nickname
      userObj["introduction"] = user.introduction
      userObj["image"] = user.image
      usersArray.push(userObj)
    end
    data = {
      'follows': usersArray,
      'page_length': page_length
    }
    render json: data
  end

  def followers
    users = current_user.followers
    page_length = users.page(1).per(10).total_pages
    usersArray = []
    users.each do |user|
      userObj = {}
      userObj["id"] = user.id
      userObj["name"] = user.name
      userObj["nickname"] = user.nickname
      userObj["introduction"] = user.introduction
      userObj["image"] = user.image
      usersArray.push(userObj)
    end
    data = {
      'followers': usersArray,
      'page_length': page_length
    }
    render json: data
  end

  def destroy
    if current_user.authenticate(params[:user][:password])
      current_user.destroy
      reset_session
      render json: "ok"
    else
      render json: "ng"
    end
  end
  

  private
  
  def user_params
    params.require(:user).permit(:id, :name, :email, :nickname, :introduction, :image)
  end
end
