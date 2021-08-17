class Api::V1::User::PostsController < Api::V1::User::Base
  
  def index
    @posts = Post.page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'index', handlers: 'jbuilder'
  end

  def show
    @post = Post.find(params[:id])
    render 'show', handlers: 'jbuilder'
  end

  def create
    post = Post.new(post_params)
    if post.save!
      render json: post
    end
  end

  def auth
    post = Post.find(params[:id])
    if post.user_id == current_user.id
      render json: true
    else
      render json: false
    end
  end

  def update
    post = Post.find(params[:id])
    if post_params[:tag_ids] === nil
      post.tags = []
    end
    post.update!(post_params)
    if post.save
      render json: post
    else
      render html: {status: 400}
    end
  end

  def destroy
    post = Post.find(params[:id]) 
    if current_user.id === post.user_id
      if post.destroy
        render json: {status: 200}
      end
    else
      render json: {status: 400}
    end
  end

  private
  def post_params
    params.require(:post).permit(:user_id, :title, :content, :image, tag_ids:[])
  end
end