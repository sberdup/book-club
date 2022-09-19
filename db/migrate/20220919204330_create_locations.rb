class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.references :book, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :location

      t.timestamps
    end
  end
end
