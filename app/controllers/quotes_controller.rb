class QuotesController < ApplicationController
    def index 
        render json:Quote.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Quote.create!(quote_params), status: :created
    end

    def show 
        render json:find_quote
    end

    def update 
        find_quote.update!(quote_params)
        render json:find_quote, status: :accepted
    end

    def destroy 
        find_quote.destroy 
        head :no_content
    end

    private 

    def quote_params 
        params.permit(:book_id, :body, :chapter, :page)
    end

    def find_quote 
        Quote.find(params[:id])
    end
end
