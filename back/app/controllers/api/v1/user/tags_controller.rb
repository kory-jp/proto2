class Api::V1::User::TagsController < Api::V1::User::Base
  def index
    @tags = Tag.all
    render 'index', handlers: 'jbuilder'
  end

  def search
    tag = Tag.find_by(label: params[:tag][:label])
    @posts = tag.posts.eager_load(:user, :tags, :post_tag_relations).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'search', handlers: 'jbuilder'
  end

end
