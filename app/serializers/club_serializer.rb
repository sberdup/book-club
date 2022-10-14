class ClubSerializer < ActiveModel::Serializer
  attributes :id, :name, :message
  has_many :books
  has_one :image
end
