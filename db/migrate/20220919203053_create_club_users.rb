class CreateClubUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :club_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :club, null: false, foreign_key: true
      t.boolean :is_owner
      t.boolean :is_admin

      t.timestamps
    end
  end
end
