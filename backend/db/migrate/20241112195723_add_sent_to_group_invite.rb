class AddSentToGroupInvite < ActiveRecord::Migration[7.1]
  def change
    add_column :group_invites, :sent_count, :integer, default: 0
  end
end
