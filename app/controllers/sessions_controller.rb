class SessionsController < ApplicationController
    def create 
        if grab_user&.authenticate(params[:password])
            session[:user_id] = grab_user.id 
            render json: grab_user
        else 
            render json:{error:'Check your username/password.'}, status: :unauthorized
        end
    end

    def destroy 
        session.delete :user_id 
        head :no_content
    end
end
