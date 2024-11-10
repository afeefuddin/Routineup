class AddPasswordDigestInUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :password, :string
    add_column :users, :password_digest, :string
  end
end
