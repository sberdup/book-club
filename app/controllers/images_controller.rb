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
        @image = Image.create!(@ex_params)
        render json: {data: @image, status: :ok}
    end

    def destroy
        @image = Image.find(image_params[:id])
        @image.destroy
    end

    def update
    end

    private

    def image_params
        params.permit(:id, :file, :fileName)
    end
end
