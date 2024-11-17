class LectureBlueprint < Blueprinter::Base
  identifier :public_id

  fields :topic, :description, :notes, :start_time, :end_time

  view :with_subject do
    association :subject, blueprint: SubjectBlueprint
  end
end
