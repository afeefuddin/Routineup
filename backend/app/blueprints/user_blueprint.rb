class UserBlueprint < Blueprinter::Base
  identifier :public_id

  fields :email, :username, :verified, :profile_completed, :created_at, :updated_at

end