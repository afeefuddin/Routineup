class Api::SubjectsController < ApiController
  before_action :authenticate_scrubber
  def index
    subjects = Subject.where(educator: current_user.educator).all
    render json: {
      results: SubjectBlueprint.render_as_hash(subjects)
    }
  end

  def create
    return if subject_params[:name].nil?

    subject = Subject.create(subject_params)
    subject.educator = current_user.educator
    subject.save
    render json: {
      result: SubjectBluePrint.render_as_hash(subject)
    }
  end

  def show
    subject = Subject.find_by(public_id: params[:id])
    render json: {
      result: SubjectBluePrint.render_as_hash(subject)
    }
  end

  def update
    subject = Subject.find_by(public_id: params[:id])
    return render json: { error: 'Subject not found' }, status: :not_found if subject.nil?

    if params[:completed]
      subject.completed = true
      subject.save
    elsif params[:group_id]
      subject.groups = Group.where(public_id: params[:group_id])
      subject.save
    end

    render json: {
      result: SubjectBluePrint.render_as_hash(subject)
    }
  end

  private

  def subject_params
    params.permit(:name, :subject_code)
  end
end
