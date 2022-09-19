class Group < ApplicationRecord
  belongs_to :book
  validates :name, presence:true, uniqueness:true
end
