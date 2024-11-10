class GroupInvite < ApplicationRecord
  belongs_to :group
  belongs_to :user
  belongs_to :invited_by, class_name: 'User'
end
