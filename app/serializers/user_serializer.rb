class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :first_name, :last_name, :username
  has_many :clubs
  has_many :books
  has_one :image
end
