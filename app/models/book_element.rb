class BookElement < ApplicationRecord
  belongs_to :book
  validates :name, presence:true, uniqueness:true
  validates :description, presence:true
end
