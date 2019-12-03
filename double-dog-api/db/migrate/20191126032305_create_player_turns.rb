class CreatePlayerTurns < ActiveRecord::Migration[6.0]
  def change
    create_table :player_turns do |t|
      t.references :player,null: false, foreign_key: true
      t.references :dare,null: false, foreign_key: true

      t.timestamps
    end
  end
end
j