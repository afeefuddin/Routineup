class AddStatusToGroupInvites < ActiveRecord::Migration[7.1]
  def change
    add_column :group_invites, :status, :string, default: 'pending'
    add_column :group_invites, :public_id, :string
  end
end
