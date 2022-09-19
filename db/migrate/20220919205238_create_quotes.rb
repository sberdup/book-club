class CreateQuotes < ActiveRecord::Migration[7.0]
  def change
    create_table :quotes do |t|
      t.references :book, null: false, foreign_key: true
      t.string :body
      t.string :chapter
      t.string :page

      t.timestamps
    end
  end
end
