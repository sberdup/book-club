class UsersController < ApplicationController
    
    def create 
        render json:User.create!(user_params), status: :created
    end

    def show 
        render json:grab_user
    end

    def update 
        grab_user.update!(user_params)
        render json:grab_user, status: :accepted
    end

    def destroy 
        grab_user.destroy 
        head :no_content
    end

    private 

    def user_params 
        params.permit(:first_name, :last_name, :username, :email, :profile_picture, :password_digest)
    end
end
