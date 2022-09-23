class StorylinesController < ApplicationController
    def index 
        render json:Storyline.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Storyline.create!(storyline_params), status: :created
    end

    def show 
        render json:find_storyline
    end

    def update 
        find_storyline.update!(storyline_params)
        render json:find_storyline, status: :accepted
    end

    def destroy 
        find_storyline.destroy 
        head :no_content
    end

    private 

    def storyline_params 
        params.permit(:book_id, :name, :description)
    end

    def find_storyline 
        Storyline.find(params[:id])
    end
end
