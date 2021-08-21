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
    @posts = tag.posts.eager_load(:user, :tags).page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'search', handlers: 'jbuilder'
  end

end
