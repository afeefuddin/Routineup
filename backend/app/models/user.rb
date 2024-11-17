class User < ApplicationRecord
  has_secure_password

  before_save :downcase_email

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  has_one :educator, dependent: :destroy
  has_and_belongs_to_many :groups, join_table: 'groups_users'
  has_many :group_invites, dependent: :destroy

  def subjects
    groups.joins(:subjects).uniq
  end

  private

  def downcase_email
    self.email = email.downcase
  end
end
