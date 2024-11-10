class Group < ApplicationRecord
  has_and_belongs_to_many :subjects, join_table: 'group_subjects'
end
