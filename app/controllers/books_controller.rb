class BooksController < ApplicationController
    def index 
        render json:Book.all
    end

    def create 
        render json:Book.find_or_create_by!(book_params), status: :created
    end

    def show 
        render json:find_book
    end

    def update 
        find_book.update!(book_params)
        render json:find_book, status: :accepted
    end

    def destroy 
        find_book.destroy 
        head :no_content
    end

    private 

    def book_params 
        params.permit(:title, :author, :pages, :genre, :cover_picture, :description)
    end

    def find_book 
        Book.find(params[:id])
    end
end
