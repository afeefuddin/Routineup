class Api::LectureController < ApiController
  def create
    return unless educator
    return invalid_params unless params[:subject_id] && params[:topic] && params[:description] && params[:start_time]

    subject = educator.subjects.find_by(public_id: params[:subject_id])
    return not_found unless subject

    params[:start_time] = Time.parse(params[:start_time])
    params[:end_time] = params[:start_time] + 1.hour if params[:end_time] && params[:end_time].empty?
    params[:end_time] =
      Time.parse(params[:end_time].to_s)

    lecture = Lecture.create(subject: subject, topic: params[:topic], description: params[:description],
                             notes: params[:notes], start_time: params[:start_time], end_time: params[:end_time])

    render json: { result: LectureBlueprint.render_as_hash(lecture) }
  end

  def index
    lectures = if educator
                 educator_lecture
               else
                 Subject.joins(:groups).joins(:lectures).where({ groups: current_user.groups }).map(&:lectures).uniq
               end
    render json: {
      results: LecutreBlueprint.render_as_hash(lectures)
    }
  end

  def show
    return unless educator

    lecture = educator_lecture.find_by(public_id: params[:id])
    return not_found unless lecture

    render json: { result: LectureBlueprint.render_as_hash(lecture, view: :with_subject) }
  end

  def update
    return unless educator

    lecture = educator_lecture.find_by(public_id: params[:id])
    update_list = {}

    update_list[:start_time] = Time.parse(params[:start_time]) if params[:start_time]
    update_list[:end_time] = Time.parse(params[:end_time]) if params[:end_time]
    update_list[:topic] = params[:topic] if params[:topic]
    update_list[:description] = params[:description] if params[:description]
    lecture.update(update_list)

    render json: { result: LectureBlueprint.render_as_hash(lecture) }
  end

  private

  def invalid_params
    render json: { error: 'Invalid params' }, status: :bad_request
  end

  def not_found
    render json: { error: 'Not found' }, status: :not_found
  end

  def educator_lecture
    Lecture.joins(:subject).where({ subjects: { educator: educator } })
  end
end
