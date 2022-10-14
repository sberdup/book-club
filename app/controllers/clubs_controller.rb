class ClubsController < ApplicationController
    def index 
        render json:Club.all
    end

    def create 
        new_club = Club.create!(club_params)
        ClubUser.create!({club_id:new_club.id, user_id:grab_user.id, is_owner:true, is_admin:true})
        render json:new_club, status: :created
    end

    def show 
        render json:find_club
    end

    def update 
        find_club.update!(club_params)
        render json:find_club, status: :accepted
    end

    def destroy 
        find_club.destroy 
        head :no_content
    end

    private 

    def club_params 
        params.permit(:name, :message)
    end

    def find_club 
        Club.find(params[:id])
    end
end
