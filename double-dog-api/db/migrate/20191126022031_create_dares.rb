class CreateDares < ActiveRecord::Migration[6.0]
  def change
    create_table :dares do |t|
      t.string :text
      t.integer :points
      t.integer :shots

      t.timestamps
    end
  end
end
