class CreateClubBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :club_books do |t|
      t.references :club, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
