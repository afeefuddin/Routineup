class CreateJoinTableGroupSubjects < ActiveRecord::Migration[7.1]
  def change
    remove_reference :subjects, :group, null: false, foreign_key: true

    create_table :group_subjects, id: false do |t|
      t.references :group, null: false, foreign_key: true, index: true
      t.references :subject, null: false, foreign_key: true, index: true
    end
    add_index :group_subjects, %i[group_id subject_id], unique: true
  end
end
