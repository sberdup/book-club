class ClubUser < ApplicationRecord
  belongs_to :user
  belongs_to :club
  # validates :is_owner, :is_admin, presence:true
  # INCREDIBLY ANNOYING bug requires checking for inclusion
  validates :is_owner, :is_admin, exclusion: [nil]
  validates :user_id, uniqueness:{scope: :club_id}
end
