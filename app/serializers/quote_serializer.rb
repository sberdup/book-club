class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :body, :chapter, :page
  has_one :book
end
