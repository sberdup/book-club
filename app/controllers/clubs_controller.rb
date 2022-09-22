class ClubsController < ApplicationController
    def index 
        render json:Club.all
    end

    def create 
        render json:Club.create!(club_params), status: :created
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
        params.permit(:name, :club_picture, :message)
    end

    def find_club 
        Club.find(params[:id])
    end
end
