class SessionsController < ApplicationController
    skip_before_action :authenticate_user, only: :create
    def create 
        user = User.find_by(username:params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id 
            render json: user, include: ['books', 'books.image', 'clubs', 'clubs.image']
        else 
            render json:{errors:['Check your username/password.']}, status: :unauthorized
        end
    end

    def destroy 
        session.delete :user_id 
        head :no_content
    end
end
