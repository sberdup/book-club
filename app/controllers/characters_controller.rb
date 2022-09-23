class CharactersController < ApplicationController
    def index 
        render json:Character.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Character.create!(character_params), status: :created
    end

    def show 
        render json:find_character
    end

    def update 
        find_character.update!(character_params)
        render json:find_character, status: :accepted
    end

    def destroy 
        find_character.destroy 
        head :no_content
    end

    private 

    def character_params 
        params.permit(:book_id, :name, :aliases, :description)
    end

    def find_character 
        Character.find(params[:id])
    end
end
