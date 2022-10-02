class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :body, :chapter, :page
end
