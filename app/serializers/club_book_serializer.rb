class ClubBookSerializer < ActiveModel::Serializer
  attributes :id, :status
  has_one :club
  has_one :book
end
