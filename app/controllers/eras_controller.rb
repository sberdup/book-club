class ErasController < ApplicationController
    def index 
        render json:Era.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Era.create!(era_params), status: :created
    end

    def show 
        render json:find_era
    end

    def update 
        find_era.update!(era_params)
        render json:find_era, status: :accepted
    end

    def destroy 
        find_era.destroy 
        head :no_content
    end

    private 

    def era_params 
        params.permit(:book_id, :name, :time, :description)
    end

    def find_era 
        Era.find(params[:id])
    end
end
