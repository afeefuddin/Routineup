class Subject < ApplicationRecord
  belongs_to :educator
  has_and_belongs_to_many :groups, join_table: 'group_subjects'
  has_many :lectures
end
