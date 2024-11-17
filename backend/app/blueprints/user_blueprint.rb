class UserBlueprint < Blueprinter::Base
  identifier :public_id

  fields :email, :username, :verified, :profile_completed, :created_at, :updated_at
  view :with_educator do
    association :educator, blueprint: EducatorBlueprint
  end

  view :invited_by do
    exclude :verified
    exclude :profile_completed
    exclude :created_at
    exclude :updated_at
  end
end
