class ThemeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_one :book
end
