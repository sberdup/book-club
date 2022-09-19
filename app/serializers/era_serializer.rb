class EraSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :time
  has_one :book
end
