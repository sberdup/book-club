class ItemsController < ApplicationController
    def index 
        render json:Item.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Item.create!(item_params), status: :created
    end

    def show 
        render json:find_item
    end

    def update 
        find_item.update!(item_params)
        render json:find_item, status: :accepted
    end

    def destroy 
        find_item.destroy 
        head :no_content
    end

    private 

    def item_params 
        params.permit(:book_id, :name, :description)
    end

    def find_item 
        Item.find(params[:id])
    end
end
