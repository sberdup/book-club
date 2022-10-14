class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :pages, :genre, :description
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
  has_one :image
end
