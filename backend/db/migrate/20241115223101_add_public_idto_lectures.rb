class AddPublicIdtoLectures < ActiveRecord::Migration[7.1]
  def change
    add_column :lectures, :public_id, :string
  end
end
