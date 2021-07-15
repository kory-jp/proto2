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
  
end
