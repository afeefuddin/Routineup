class AddLectures < ActiveRecord::Migration[7.1]
  def change
    create_table :lectures do |t|
      t.string :topic
      t.string :description
      t.string :notes
      t.datetime :start_time
      t.datetime :end_time
      t.references :subject, null: false, foreign_key: true
    end
  end
end
