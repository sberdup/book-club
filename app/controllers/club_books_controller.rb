class ClubBooksController < ApplicationController
    def index 
        render json:ClubBook.where("club_id = ?", params[:club_id])
    end

    def create 
        render json:ClubBook.create!(club_book_params), status: :created
    end

    def update 
        find_club_book.update!(club_book_params)
        render json:find_club_book, status: :accepted
    end

    def destroy 
        find_club_book.destroy 
        head :no_content
    end

    private 

    def club_book_params 
        params.permit(:club_id, :book_id, :status)
    end

    def find_club_book 
        ClubBook.find(params[:id])
    end
end
