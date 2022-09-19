class ClubSerializer < ActiveModel::Serializer
  attributes :id, :name, :club_picture, :message
end
