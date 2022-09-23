class GroupsController < ApplicationController
    def index 
        render json:Group.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Group.create!(group_params), status: :created
    end

    def show 
        render json:find_group
    end

    def update 
        find_group.update!(group_params)
        render json:find_group, status: :accepted
    end

    def destroy 
        find_group.destroy 
        head :no_content
    end

    private 

    def group_params 
        params.permit(:book_id, :name, :description)
    end

    def find_group 
        Group.find(params[:id])
    end
end
