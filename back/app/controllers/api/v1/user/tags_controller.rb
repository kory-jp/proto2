class Api::V1::User::TagsController < Api::V1::User::Base
  def index
  tags = Tag.all
  render json: tags
  end

  def show
    tag = Tag.find(params[:id])
    render json: tag
  end

  def search
    tag = Tag.find_by(label: params[:tag][:label])
    posts = tag.posts.page(params[:page] ||=1).per(10).order(created_at: "DESC")
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

end
