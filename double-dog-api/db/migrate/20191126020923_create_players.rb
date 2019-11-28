class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :score
      t.integer :shots
      t.references :game,null: false, foreign_key: true

      t.timestamps
    end
  end
end
