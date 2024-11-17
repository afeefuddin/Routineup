class Educator < ApplicationRecord
  belongs_to :user
  has_many :subjects
end
