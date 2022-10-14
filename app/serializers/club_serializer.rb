class ClubSerializer < ActiveModel::Serializer
  attributes :id, :name, :club_picture, :message
  has_many :books
  has_one :image
end
