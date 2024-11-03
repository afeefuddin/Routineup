class AddTables < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :public_id
      t.string :password
      t.string :username
      t.boolean :verified, default: false
      t.boolean :profile_completed, default: false
      t.timestamps
    end

    create_table :educators do |t|
      t.string :institution_name 
      t.string :public_id
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    create_table :groups do |t| 
      t.string :group_name
      t.references :admin, null: false, foreign_key: { to_table: :users }
      t.string :public_id
      t.timestamps
    end

    create_table :groups_users do |t|
      t.references :group, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    add_index :groups_users, [:group_id, :user_id], unique: true

    create_table :subjects do |t|
      t.string :name
      t.string :subject_code
      t.boolean :completed, default: false
      t.references :educator, null: false, foreign_key: true
      t.references :group, foreign_key: true
      t.timestamps 
    end

    create_table :course_sessions do |t| 
      t.datetime :timeslot
      t.references :subject, null: false, foreign_key: true
      t.timestamps 
    end

    add_index :users, :email, unique: true
  end
end
