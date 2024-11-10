# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 20_241_109_204_302) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'course_sessions', force: :cascade do |t|
    t.datetime 'timeslot'
    t.bigint 'subject_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['subject_id'], name: 'index_course_sessions_on_subject_id'
  end

  create_table 'educators', force: :cascade do |t|
    t.string 'institution_name'
    t.string 'public_id'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_educators_on_user_id'
  end

  create_table 'groups', force: :cascade do |t|
    t.string 'group_name'
    t.bigint 'admin_id', null: false
    t.string 'public_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['admin_id'], name: 'index_groups_on_admin_id'
  end

  create_table 'groups_users', force: :cascade do |t|
    t.bigint 'group_id', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[group_id user_id], name: 'index_groups_users_on_group_id_and_user_id', unique: true
    t.index ['group_id'], name: 'index_groups_users_on_group_id'
    t.index ['user_id'], name: 'index_groups_users_on_user_id'
  end

  create_table 'subjects', force: :cascade do |t|
    t.string 'name'
    t.string 'subject_code'
    t.boolean 'completed', default: false
    t.bigint 'educator_id', null: false
    t.bigint 'group_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['educator_id'], name: 'index_subjects_on_educator_id'
    t.index ['group_id'], name: 'index_subjects_on_group_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', null: false
    t.string 'public_id'
    t.string 'username'
    t.boolean 'verified', default: false
    t.boolean 'profile_completed', default: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'password_digest'
    t.index ['email'], name: 'index_users_on_email', unique: true
  end

  add_foreign_key 'course_sessions', 'subjects'
  add_foreign_key 'educators', 'users'
  add_foreign_key 'groups', 'users', column: 'admin_id'
  add_foreign_key 'groups_users', 'groups'
  add_foreign_key 'groups_users', 'users'
  add_foreign_key 'subjects', 'educators'
  add_foreign_key 'subjects', 'groups'
end
