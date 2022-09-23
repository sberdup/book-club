class ThemesController < ApplicationController
    def index 
        render json:Theme.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Theme.create!(theme_params), status: :created
    end

    def show 
        render json:find_theme
    end

    def update 
        find_theme.update!(theme_params)
        render json:find_theme, status: :accepted
    end

    def destroy 
        find_theme.destroy 
        head :no_content
    end

    private 

    def theme_params 
        params.permit(:book_id, :name, :description)
    end

    def find_theme 
        Theme.find(params[:id])
    end
end
