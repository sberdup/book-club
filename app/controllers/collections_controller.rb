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
        render json:{message:"Book removed."}, status: :ok
    end

    private 

    def collection_params 
        params.permit(:user_id, :book_id, :status)
    end

    def find_collection 
        Collection.where("book_id = ? AND user_id = ?", params[:id], params[:user_id])[0]
    end
end
