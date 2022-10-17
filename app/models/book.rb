class Book < ApplicationRecord
    has_many :collections, dependent: :destroy
    has_many :users, through: :collections

    has_many :club_books, dependent: :destroy 
    has_many :clubs, through: :club_books

    has_many :book_elements, dependent: :destroy 
    has_many :characters, dependent: :destroy 
    has_many :eras, dependent: :destroy 
    has_many :events, dependent: :destroy 
    has_many :groups, dependent: :destroy 
    has_many :items, dependent: :destroy 
    has_many :locations, dependent: :destroy 
    has_many :quotes, dependent: :destroy 
    has_many :storylines, dependent: :destroy 
    has_many :themes, dependent: :destroy 

    has_one :image, dependent: :destroy

    validates :title, :author, :description, presence:true 
    validates :title, uniqueness:{scope: :author}
    validates :pages, numericality:{greater_than: 0}
end
