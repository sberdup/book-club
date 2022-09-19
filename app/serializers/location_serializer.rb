class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location
  has_one :book
end
