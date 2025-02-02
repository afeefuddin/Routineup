class Api::UserController < ApiController
  def index
    render json: {
      result: UserBlueprint.render_as_hash(current_user, view: :with_educator)
    }
  end
end
