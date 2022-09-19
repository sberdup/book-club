class SessionsController < ApplicationController
    def create 
        session[:user_id] = grab_user.id 
        render json: grab_user
    end

    def destroy 
        session.delete :user_id 
        head :no_content
    end
end
