class ApplicationController < ActionController::API
  include ActionController::Cookies
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
before_action :authenticate_user

def hello_world
  session[:count] = (session[:count] || 0) + 1
  render json: { count: session[:count] }
end

private 

  def authenticate_user 
    render json: {errors: "User not authorized."}, status: :unauthorized unless grab_user
  end

  def auth_admin 
    render json:{errors:"You do not have admin permissions for this action."}, status: :unauthorized unless grab_user.is_admin?
  end

  def auth_owner
    render json: {errors: "You do not have owner permissions for this action."}, status: :unauthorized unless grab_user.is_owner?
  end

  def grab_user 
    @current_user ||= User.find(session[:user_id])
    # || User.find_by(username:params[:username])
  end

  def render_unprocessable_entity_response(exception)
    render json:{errors: exception.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json:{errors: "#{exception.model} not found!"}, status: :not_found
  end
end
