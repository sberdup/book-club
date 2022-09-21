class UsersController < ApplicationController
    
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json:user, status: :created
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
        params.permit(:first_name, :last_name, :username, :email, :profile_picture, :password, :password_confirmation)
    end
end
