require 'open-uri'

class User < ApplicationRecord
    has_many :club_users, dependent: :destroy
    has_many :clubs, through: :club_users

    has_many :collections, dependent: :destroy
    has_many :books, through: :collections

    has_one :image

    has_secure_password
    validates :username, :email, :password, :password_confirmation, presence:true
    validates :username, :email, uniqueness:true
    validates :username, length: {in: 3..18}
    validates :password, length: {in: 8..20}, confirmation:true
end
