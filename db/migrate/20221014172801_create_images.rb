class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.string :url 
      t.string :ik_id
      t.string :file_name
      t.references :user, foreign_key: true
      t.references :club, foreign_key: true
      t.references :book, foreign_key: true
      t.timestamps
    end
  end
end
