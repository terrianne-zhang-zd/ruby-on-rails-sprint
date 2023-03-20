class MembersController < ApplicationController
    
    protect_from_forgery

    def index
        render json: Member.all
    end 

    def create
        member = Member.create(member_params)
        render json: member
    end

    private

    def member_params
        params.require(:member).permit(:name, :age, :role, :bio)
    end 

    def update
        member = Member.find(params[:id])
        member.update_attributes(member_params)
    end
end
