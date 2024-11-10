class AddGroupInvite < ActiveRecord::Migration[7.1]
  def change
    create_table :group_invites do |t|
      t.references :group, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :invited_by, null: false, foreign_key: { to_table: :users }
    end
  end
end
