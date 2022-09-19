class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.references :book, null: false, foreign_key: true
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
