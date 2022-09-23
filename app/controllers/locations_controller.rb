class LocationsController < ApplicationController
    def index 
        render json:Location.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Location.create!(location_params), status: :created
    end

    def show 
        render json:find_location
    end

    def update 
        find_location.update!(location_params)
        render json:find_location, status: :accepted
    end

    def destroy 
        find_location.destroy 
        head :no_content
    end

    private 

    def location_params 
        params.permit(:book_id, :name, :location, :description)
    end

    def find_location 
        Location.find(params[:id])
    end
end
