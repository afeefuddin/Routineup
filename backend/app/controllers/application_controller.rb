class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def authenticate
    unless auth_header.present?
      render_unauthorized('No authorization token provided')
      return
    end

    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = Jwt.decode(header)
      @current_user = User.find_by(public_id: @decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      puts "here"
      render json: { errors: e.message }, status: :unauthorized
    end
  end

  attr_reader :current_user

  def educator
    @educator ||= @current_user.educator
  end

  protected

  def auth_header
    @auth_header ||= request.headers['Authorization']&.split(' ')&.last
  end

  def render_unauthorized(message = 'Unauthorized')
    render json: {
      error: 'Unauthorized',
      message: message
    }, status: :unauthorized
  end
end
