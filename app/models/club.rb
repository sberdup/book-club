class Club < ApplicationRecord
    has_many :club_books, dependent: :destroy
    has_many :books, through: :club_books

    has_many :club_users, dependent: :destroy
    has_many :users, through: :club_users

    validates :name, presence:true, uniqueness:true
end
