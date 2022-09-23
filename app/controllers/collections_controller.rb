class CollectionsController < ApplicationController
    def index 
        render json:Collection.where("user_id = ?", params[:user_id])
    end

    def create 
        render json:Collection.create!(collection_params), status: :created
    end

    def update 
        find_collection.update!(collection_params)
        render json:find_collection, status: :accepted
    end

    def destroy 
        find_collection.destroy 
        head :no_content
    end

    private 

    def collection_params 
        params.permit(:user_id, :book_id, :status)
    end

    def find_collection 
        Collection.find(params[:id])
    end
end
