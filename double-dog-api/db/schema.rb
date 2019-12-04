# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_04_152030) do

  create_table "dares", force: :cascade do |t|
    t.string "text"
    t.integer "points"
    t.integer "shots"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "game_turns", force: :cascade do |t|
    t.integer "game_id", null: false
    t.integer "player_turn_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_game_turns_on_game_id"
    t.index ["player_turn_id"], name: "index_game_turns_on_player_turn_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "winScore", default: 10
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "player_turns", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "dare_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dare_id"], name: "index_player_turns_on_dare_id"
    t.index ["player_id"], name: "index_player_turns_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.integer "score", default: 0
    t.integer "shots", default: 0
    t.integer "game_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_players_on_game_id"
  end

  add_foreign_key "game_turns", "games"
  add_foreign_key "game_turns", "player_turns"
  add_foreign_key "player_turns", "dares"
  add_foreign_key "player_turns", "players"
  add_foreign_key "players", "games"
end
