class Group < ApplicationRecord
  has_and_belongs_to_many :subjects, join_table: 'group_subjects'
  belongs_to :admin, class_name: 'User'
  has_many :group_invites
  has_and_belongs_to_many :users, join_table: 'groups_users'
end
