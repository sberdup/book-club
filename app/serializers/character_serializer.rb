class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :aliases
end
