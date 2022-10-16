class ImagesController < ApplicationController
    def index
        all = Image.all
        render json: all
    end

    def new
        @image = Image.new(image_params)
    end

    def create 
        @ex_params = Image.ik_upload(image_params)
        # creation was breaking running validations on nil data, see Image model
        @image = Image.create!({url:@ex_params[:url], file_name:@ex_params[:file_name], ik_id:@ex_params[:ik_id], 
            user_id:image_params[:userId], club_id:image_params[:clubId], book_id:image_params[:bookId]})
        render json: @image, status: :ok
    end

    def destroy
        @image = Image.find(image_params[:id])
        @image.destroy
    end

    def update
    end

    private

    def image_params
        params.permit(:id, :file, :fileName, :userId, :clubId, :bookId)
    end
end
