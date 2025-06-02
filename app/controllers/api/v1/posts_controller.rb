class Api::V1::PostsController < ApplicationController
  before_action :require_login
  def index
    @posts = Post.all
    render json: @posts, status: :ok
  end

  private

  def require_login
    unless session[:user_id]
      render json: { error: "Please sign in" }, status: :unauthorized
    end
  end
end
