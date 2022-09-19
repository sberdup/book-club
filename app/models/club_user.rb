class ClubUser < ApplicationRecord
  belongs_to :user
  belongs_to :club
  validates :is_owner, :is_admin, presence:true
end
