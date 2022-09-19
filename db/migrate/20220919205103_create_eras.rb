class CreateEras < ActiveRecord::Migration[7.0]
  def change
    create_table :eras do |t|
      t.references :book, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.datetime :time

      t.timestamps
    end
  end
end
