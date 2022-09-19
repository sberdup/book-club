class Collection < ApplicationRecord
  belongs_to :user
  belongs_to :book
  validates :status, presence:true
end
