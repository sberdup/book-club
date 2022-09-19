class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.references :book, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :aliases

      t.timestamps
    end
  end
end
