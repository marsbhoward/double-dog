class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :winScore
      t.string :pastDares
  

      t.timestamps
    end
  end
end
