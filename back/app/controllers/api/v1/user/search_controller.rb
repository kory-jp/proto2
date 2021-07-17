class Api::V1::User::SearchController < Api::V1::User::Base
  def search
    model = params["search"]["model"]
    value = params["search"]["value"]
    keywords = value.split(/[[:blank:]]+/)

    if model == 'user'
      result_users = User.none
      keywords.each do |keyword|
        result_users = result_users.or(User.where("nickname LIKE ?", "%#{keyword}%").or(User.where("introduction LIKE ?", "%#{keyword}%")))
      end
      users = result_users.page(params[:page] ||=1).per(10).order(created_at: "DESC")
      page_length = result_users.page(1).per(10).total_pages
      usersArray = []
      users.each do |user|
        userObj = {}
        userObj["id"] = user.id
        userObj["name"] = user.name
        userObj["nickname"] = user.nickname
        userObj["email"] = user.email
        userObj["introduction"] = user.introduction
        userObj["image"] = user.image
        userObj["created_at"] = user.created_at.strftime('%Y/%m/%d')
        usersArray.push(userObj)
      end
      data = {
        'users': usersArray,
        'page_length': page_length
      }
      render json: data

    elsif model == 'post'
      result_posts = Post.none
      keywords.each do |keyword|
        result_posts = result_posts.or(Post.where("title LIKE ?", "%#{keyword}%").or(Post.where("content LIKE ?", "%#{keyword}%")))
      end
      posts = result_posts.page(params[:page] ||=1).per(10).order(created_at: "DESC")
      page_length = result_posts.page(1).per(10).total_pages
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
end
