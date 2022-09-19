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

ActiveRecord::Schema[7.0].define(version: 2022_09_19_214433) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "book_elements", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_book_elements_on_book_id"
  end

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.integer "pages"
    t.string "genre"
    t.string "cover_picture"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "characters", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.string "aliases"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_characters_on_book_id"
  end

  create_table "club_books", force: :cascade do |t|
    t.bigint "club_id", null: false
    t.bigint "book_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_club_books_on_book_id"
    t.index ["club_id"], name: "index_club_books_on_club_id"
  end

  create_table "club_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "club_id", null: false
    t.boolean "is_owner"
    t.boolean "is_admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_id"], name: "index_club_users_on_club_id"
    t.index ["user_id"], name: "index_club_users_on_user_id"
  end

  create_table "clubs", force: :cascade do |t|
    t.string "name"
    t.string "club_picture"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "collections", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "book_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_collections_on_book_id"
    t.index ["user_id"], name: "index_collections_on_user_id"
  end

  create_table "eras", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_eras_on_book_id"
  end

  create_table "events", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_events_on_book_id"
  end

  create_table "groups", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_groups_on_book_id"
  end

  create_table "items", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_items_on_book_id"
  end

  create_table "locations", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_locations_on_book_id"
  end

  create_table "quotes", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "body"
    t.string "chapter"
    t.string "page"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_quotes_on_book_id"
  end

  create_table "storylines", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_storylines_on_book_id"
  end

  create_table "themes", force: :cascade do |t|
    t.bigint "book_id", null: false
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_themes_on_book_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "profile_picture"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
  end

  add_foreign_key "book_elements", "books"
  add_foreign_key "characters", "books"
  add_foreign_key "club_books", "books"
  add_foreign_key "club_books", "clubs"
  add_foreign_key "club_users", "clubs"
  add_foreign_key "club_users", "users"
  add_foreign_key "collections", "books"
  add_foreign_key "collections", "users"
  add_foreign_key "eras", "books"
  add_foreign_key "events", "books"
  add_foreign_key "groups", "books"
  add_foreign_key "items", "books"
  add_foreign_key "locations", "books"
  add_foreign_key "quotes", "books"
  add_foreign_key "storylines", "books"
  add_foreign_key "themes", "books"
end
