class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :first_name, :last_name, :profile_picture, :username
  has_many :clubs
  has_many :books
end
