class ClearPics < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :profile_picture
    remove_column :books, :cover_picture
    remove_column :clubs, :club_picture
  end
end
