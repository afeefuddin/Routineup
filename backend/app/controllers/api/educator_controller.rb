class Api::EducatorController < ApiController
  def create
    return unless params[:institution_name].present?

    if educator.present?
      return render json: {
        result: {
          educator: EducatorBlueprint.render_as_hash(educator)
        }
      }
    end

    @educator = current_user.build_educator(educator_params)
    if @educator.save
      render json: {
        result: {
          educator: EducatorBlueprint.render_as_hash(@educator)
        }
      }
    else
      render json: {
        error: {
          message: 'Error Creating Educator'
        }
      }
    end
  end

  private

  def educator_params
    params.permit(:institution_name)
  end
end
