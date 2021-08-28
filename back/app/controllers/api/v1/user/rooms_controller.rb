class Api::V1::User::RoomsController < Api::V1::User::Base

  # ルーム情報とユーザー情報(ログインユーザーと対話相手のユーザー)、最新のメッセージ1件をルームごとに取得して一覧表示
  def index
    rooms = Entry.where(user_id: current_user.id).page(params[:page] ||=1).per(10)
    room_ids = rooms.pluck(:room_id).uniq
    @rooms = Room.includes(entries: [:user]).where(id: room_ids).to_a
    @total_pages = rooms.total_pages
    render 'index', handlers: 'jbuilder'
  end

  def create
    if params[:room][:user_id].present?
      @room = Room.create
      current_user_entry = Entry.create(:room_id => @room.id, :user_id => current_user.id)
      users_entry = Entry.create(params.require(:room).permit(:user_id, :room_id).merge(:room_id => @room.id))
      unless current_user_entry.user_id == users_entry.user_id
        if @room.save
          if current_user_entry.save
            if users_entry.save
              @entries = @room.entries.eager_load(:user)
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
      @messages = @room.messages.eager_load(:user).page(params[:page] ||=1).per(10).order("messages.created_at DESC")
      @entries = Entry.eager_load(:user).where(room_id: @room.id)
      render 'show', handlers: 'jbuilder'
    end
  end

end
