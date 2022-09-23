class EventsController < ApplicationController
    def index 
        render json:Event.where("book_id = ?", params[:book_id])
    end

    def create 
        render json:Event.create!(event_params), status: :created
    end

    def show 
        render json:find_event
    end

    def update 
        find_event.update!(event_params)
        render json:find_event, status: :accepted
    end

    def destroy 
        find_event.destroy 
        head :no_content
    end

    private 

    def event_params 
        params.permit(:book_id, :name, :description)
    end

    def find_event 
        Event.find(params[:id])
    end
end
