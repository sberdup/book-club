class ClubUserSerializer < ActiveModel::Serializer
  attributes :id, :is_owner, :is_admin
  has_one :user
  # has_one :club
end
