class AddCancelledToLectures < ActiveRecord::Migration[7.1]
  def change
    add_column :lectures, :cancelled, :boolean, default: false
  end
end
