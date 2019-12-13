class CreateGameTurns < ActiveRecord::Migration[6.0]
  def change
    create_table :game_turns do |t|
      t.references :game, null: false, foreign_key: true
      t.references :player_turn, null: false, foreign_key: true

      t.timestamps
    end
  end
end
