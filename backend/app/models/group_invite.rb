class GroupInvite < ApplicationRecord
  belongs_to :group
  belongs_to :user
  belongs_to :invited_by, class_name: 'User'

  STATUSES = %i[pending accepted declined].freeze

  # enum :status, STATUSES
end
