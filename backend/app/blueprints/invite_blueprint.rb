class InviteBlueprint < Blueprinter::Base
  identifier :public_id
  # field :created_at
  association :group, blueprint: GroupBlueprint
  association :invited_by, blueprint: UserBlueprint, view: :invited_by
end
