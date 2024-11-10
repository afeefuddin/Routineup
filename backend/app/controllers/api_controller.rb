class ApiController < ApplicationController
  before_action :authenticate

  def authenticate_scrubber
    render json: { result: { message: 'Error' } }, status: :unprocessable_entity unless current_user.educator
  end
end
