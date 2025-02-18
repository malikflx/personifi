class Api::V1::AuthController < ApplicationController
  include ActionController::Cookies

  def login
    user = User.find_by(email: params[:email])&.authenticate(params[:password])

    if user
      session[:user_id] = user.id
      render json: { logged_in: true, user: user }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def logged_in
    user = User.find_by(id: session[:user_id])

    if user
      render json: { logged_in: true, user: user }, status: :ok
    else
      render json: { logged_in: false }, status: :ok
    end
  end
  def logout
    reset_session
    render json: { logged_out: true }, status: :ok
  end
end
