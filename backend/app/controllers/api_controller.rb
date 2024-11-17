class ApiController < ApplicationController
  before_action :authenticate

  def authenticate_scrubber
    render json: { result: { message: 'Error' } }, status: :unprocessable_entity unless current_user.educator
  end

  def not_found
    render json: { result: { message: 'Not found' } }, status: :not_found
  end

  def unauthorized
    render json: { result: { message: 'Unauthorized' } }, status: :unauthorized
  end
end
