require 'open-uri'

class User < ApplicationRecord
    has_many :club_users, dependent: :destroy
    has_many :clubs, through: :club_users

    has_many :collections, dependent: :destroy
    has_many :books, through: :collections

    has_one_attached :profile_picture

    has_secure_password
    validates :username, :email, :password, :password_confirmation, presence:true
    validates :username, :email, uniqueness:true
    validates :username, length: {in: 3..18}
    validates :password, length: {in: 8..20}, confirmation:true

    before_save :grab_image

    def grab_image 
        debugger
        downloaded_image = File.open(:profile_picture)
        self.profile_picture.attach(io: downloaded_image, filename: `#{:username}.jpg`)
    end
end
