class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :pages, :genre, :cover_picture, :description
end
