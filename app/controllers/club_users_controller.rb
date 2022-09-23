class ClubUsersController < ApplicationController
    def index 
        render json:ClubUser.where("club_id = ?", params[:club_id])
    end

    def create 
        render json:ClubUser.create!(club_user_params), status: :created
    end

    def update 
        find_club_user.update!(club_user_params)
        render json:find_club_user, status: :accepted
    end

    def destroy
        find_club_user.destroy
        head :no_content
    end

    private 

    def club_user_params 
        params.permit(:user_id, :club_id, :is_admin, :is_owner)
    end

    def find_club_user
        ClubUser.find(params[:id])
    end
end
