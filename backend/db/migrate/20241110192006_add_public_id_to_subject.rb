class AddPublicIdToSubject < ActiveRecord::Migration[7.1]
  def change
    add_column :subjects, :public_id, :string
  end
end
