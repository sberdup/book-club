class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :aliases
  has_one :book
end
