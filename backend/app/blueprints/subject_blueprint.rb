class SubjectBlueprint < Blueprinter::Base
  identifier :public_id

  fields :name, :subject_code, :completed, :created_at, :updated_at

  association :groups, blueprint: GroupBlueprint
end
