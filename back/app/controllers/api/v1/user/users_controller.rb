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
    user = User.find(params[:id])
    favorite_posts = user.favorite_posts
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
  
  def follows
    user = User.find(params[:id])
    users = user.followings
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
    user = User.find(params[:id])
    users = user.followers
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

end
