class Api::V1::AuthController < ApplicationController
  include ActionController::Cookies

  def login
    user = User.find_by(email: params[:email])&.authenticate(params[:password])

    if user
      session[:user_id] = user.id
      render json: { logged_in: true, user: user }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized, head: :unauthorized
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
    render json: { logged_out: true, message: "Logged out successfully", csrf_token: form_authenticity_token }, status: :ok
  end

  def validate_email
    user = User.find_by(email: params[:email])
    render json: { exists: user.present? }, status: :ok
  end
end
