class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  before_save :set_public_id

  
  def set_public_id
    return unless self.class.column_names.include?("public_id")
    return if public_id.present?
     loop do
      self.public_id = generate_nanoid
      break unless self.class.exists?(public_id:)
    end
  end
  
  private

  def generate_nanoid(alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZ", size: 32)
    Nanoid.generate(alphabet:, size:)
  end
end
