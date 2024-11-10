class Public::Api::SignupController < ApplicationController
  # def index
  #   @user = User.find(signup_params)

  # end
  # Verifies the otp
  def update
    id = params[:id]
    otp = params[:otp]
    @user = User.find_by(public_id: id)

    if @user.verified
      return render json: {
        result: {
          message: 'User already verified'
        }
      }, status: :unprocessable_entity
    end

    if OtpService.new(@user.public_id).verify(otp)
      @user.update(verified: true)
      render json: { result: UserBlueprint.render_as_hash(@user) }, status: :ok
    else
      render json: { result: {
        message: 'Invalid OTP'
      } }, status: :unprocessable_entity
    end
  end

  def create
    puts "Recived params; #{params.inspect} \n"
    @user = User.find_or_initialize_by(email: signup_params[:email])

    if @user.verified
      return render json: { result: {
        message: 'User Already Exists'
      } }, status: :unprocessable_entity
    end

    @user.assign_attributes(username: signup_params[:username], password: signup_params[:password])

    if @user.save
      OtpService.new(@user.public_id).generate
      render json: { result: UserBlueprint.render_as_hash(@user) }, status: :ok
    else
      render json: {
        result: {
          message: 'Invalid OTP'
        }
      }, status: :unprocessable_entity
    end
  end

  private

  def signup_params
    params.permit(:email, :username, :password)
  end
end
