class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: :create
    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json:user, status: :created
    end

    def show 
        render json:User.find(session[:user_id]), include: ['books', 'books.image', 'clubs', 'clubs.image', 'image']
    end

    def update 
        user = User.find()
        grab_user.update!(user_params)
        render json:grab_user, status: :accepted
    end

    def destroy 
        grab_user.destroy 
        head :no_content
    end

    private 

    def user_params 
        params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
    end
end
