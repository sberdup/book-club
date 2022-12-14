class ClubUsersController < ApplicationController
    before_action :auth_admin, only:[:create, :destroy]
    before_action :auth_owner, only:[:update]
    # changing admins requires ownership, adding or removing requires adminship
    def index 
        render json:ClubUser.where("club_id = ?", params[:club_id])
    end
    
    def perms 
        render json:ClubUser.where("user_id = ? AND club_id = ?", @current_user.id, params[:club_id])
    end

    def create 
        new_user = User.find_by!(username:params[:username])
        render json:ClubUser.create!({club_id:params[:club_id], user_id:new_user.id, is_admin:params[:is_admin] || false, is_owner:params[:is_owner] || false}), status: :created
    end

    def update 
        if find_club_user.is_owner?
            render json:{errors:["Abdication not permitted."]}, status: :forbidden 
        else
            find_club_user.update!(club_user_params)
            render json:find_club_user, status: :accepted
        end
    end

    def destroy
        if find_club_user.is_admin?
            render json:{errors:["Can't remove admins!"]}, status: :forbidden
        else
            find_club_user.destroy
            render json:{message:"User removed."}, status: :ok
        end
    end

    private 

    def club_user_params 
        params.permit(:user_id, :club_id, :is_admin, :is_owner)
    end

    def find_club_user
        ClubUser.where("user_id = ? AND club_id = ?", params[:id], params[:club_id])[0]
    end

    def auth_admin 
        perm_user = ClubUser.where("user_id = ? AND club_id = ?", @current_user.id, params[:club_id])
        render json:{errors:["You do not have admin permissions for this action."]}, status: :forbidden unless perm_user[0].is_admin?
    end
    
    def auth_owner
        perm_user = ClubUser.where("user_id = ? AND club_id = ?", @current_user.id, params[:club_id])
        render json: {errors:["You do not have owner permissions for this action."]}, status: :forbidden unless perm_user[0].is_owner?
    end
end
