class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :status
  has_one :user
  has_one :book
end
