class Public::Api::LoginController < ApplicationController

  def create
    @user = User.find_by(email: login_params[:email])

    if @user&.authenticate(login_params[:password])
      token = Jwt.encode({ user_id: @user.public_id, email: @user.email })
      render json: {
        result: {
          message: 'User logged in', token: token
        }
      }, status: :ok
    else
      render json: { message: 'Invalid credentials' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end
