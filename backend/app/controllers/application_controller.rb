class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def authenticate
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = Jwt.decode(header)
      @current_user = User.find_by(public_id: @decoded[:user_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e.message }, status: :unauthorized
      rescue JWT::DecodeError => e
        render json: { errors: e.message }, status: :unauthorized
    end 
  end

  def current_user
    @current_user
  end
end
