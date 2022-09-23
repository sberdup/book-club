class BookElementsController < ApplicationController
    def index 
        render json:BookElement.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:BookElement.create!(book_element_params), status: :created
    end

    def show 
        render json:find_book_element
    end

    def update 
        find_book_element.update!(book_element_params)
        render json:find_book_element, status: :accepted
    end

    def destroy 
        find_book_element.destroy 
        head :no_content
    end

    private 

    def book_element_params 
        params.permit(:book_id, :name, :description)
    end

    def find_book_element 
        BookElement.find(params[:id])
    end
end
