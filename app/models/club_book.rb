class ClubBook < ApplicationRecord
  belongs_to :club
  belongs_to :book
  validates :status, presence:true
  validates :book_id, uniqueness:{scope: :club_id}
end
