class Club < ApplicationRecord
    has_many :club_books
    has_many :books, through: :club_books

    has_many :club_users
    has_many :users, through: :club_users
end
