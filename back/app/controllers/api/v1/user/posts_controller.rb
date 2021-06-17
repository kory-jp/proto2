class Api::V1::User::PostsController < ApplicationController
  
  def index
    @posts = Post.all.order(created_at: "DESC")
    render json: {status: 200, posts: @posts}
  end

  def show
    @post = Post.find(params[:id])
    render json: {status: 200, post: @post}
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: {status: 200, post: post}
    else
      render json: {status: 500}
    end
  end

  private
  def post_params
    params.require(:post).permit(:user_id, :title, :content, :image)
  end
end