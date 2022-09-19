class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :pages
      t.string :genre
      t.string :cover_picture
      t.string :description

      t.timestamps
    end
  end
end
