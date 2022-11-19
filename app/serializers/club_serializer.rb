class ClubSerializer < ActiveModel::Serializer
  attributes :id, :name, :message
  has_many :books
  has_many :club_users
  has_one :image
end
