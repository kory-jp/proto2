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
      @users = result_users.page(params[:page] ||=1).per(10).order(created_at: "DESC")
      render 'search_user', handlers: 'jbuilder'

    elsif model == 'post'
      result_posts = Post.none
      keywords.each do |keyword|
        result_posts = result_posts.or(Post.where("title LIKE ?", "%#{keyword}%").or(Post.where("content LIKE ?", "%#{keyword}%")))
      end
      @posts = result_posts.eager_load(:user, :tags).page(params[:page] ||=1).per(10).order(created_at: "DESC")
      render 'search_post', handlers: 'jbuilder'
    end
  end
end
