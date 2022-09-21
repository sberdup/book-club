class ApplicationController < ActionController::API
  include ActionController::Cookies
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  @@current_user =|| User.find(session[:user_id])

  def hello_world
      session[:count] = (session[:count] || 0) + 1
      render json: { count: session[:count] }
  end

  private 
  
  def authenticate_user 
    user&.authenticate(params[:password])
  end

  def grab_user 
    User.find_by(username: param[:username])
  end

  def render_unprocessable_entity_response(exception)
    render json:{errors: exception.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json:{error: "#{exception.model} not found!"}, status: :not_found
  end
end
