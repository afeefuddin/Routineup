class EducatorController < ApiController
  def create
    if educator.present?
      return render json: {
        result: {
          educator: EducatorBlueprint.render_as_hash(educator)
        }
      }
    end
    # @educator = 
  end
end
