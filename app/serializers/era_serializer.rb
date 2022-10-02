class EraSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :time
end
