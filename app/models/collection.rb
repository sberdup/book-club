class Collection < ApplicationRecord
  belongs_to :user
  belongs_to :book
  validates :status, presence:true
  validates :book_id, uniqueness:{scope: :user_id}
end
