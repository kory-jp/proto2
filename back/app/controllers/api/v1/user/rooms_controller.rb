class Api::V1::User::RoomsController < Api::V1::User::Base
  def index
    @entries = current_user.entries.page(params[:page] ||=1).per(10).order(created_at: "DESC")
    render 'index', handlers: 'jbuilder'
  end

  def create
    if params[:room][:user_id] != ""
      @room = Room.create
      current_user_entry = Entry.create(:room_id => @room.id, :user_id => current_user.id)
      users_entry = Entry.create(params.require(:room).permit(:user_id, :room_id).merge(:room_id => @room.id))
      unless current_user_entry.user_id == users_entry.user_id
        if @room.save
          if current_user_entry.save
            if users_entry.save
              @entries = @room.entries
              render 'create', handlers: 'jbuilder'
            end
          end
        end
      else
        render json: {status: 400}
      end
    else
      render json: {status: 400}
    end
  end

  def show
    @room = Room.find(params[:id])
    if Entry.where(user_id: current_user.id, room_id: @room.id).present?
      @messages = @room.messages.page(params[:page] ||=1).per(10).order("created_at ASC")
      render 'show', handlers: 'jbuilder'
    end
  end

end
