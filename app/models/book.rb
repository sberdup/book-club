class Book < ApplicationRecord
    has_many :collections
    has_many :users, through: :collections

    has_many :club_books 
    has_many :clubs, through: :club_books

    has_many :book_elements
    has_many :characters
    has_many :eras
    has_many :events
    has_many :groups
    has_many :items
    has_many :locations 
    has_many :quotes 
    has_many :storylines 
    has_many :themes

    validates :title, :author, :description, presence:true 
    validates :title, uniqueness:{scope: :author}
    validates :pages, numericality:{greater_than: 0}
end
