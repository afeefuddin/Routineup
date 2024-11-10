class UserBlueprint < Blueprinter::Base
  identifier :public_id

  fields :email, :username, :verified, :profile_completed, :created_at, :updated_at
  view :with_educator do
    association :educator, blueprint: EducatorBlueprint
  end
end
