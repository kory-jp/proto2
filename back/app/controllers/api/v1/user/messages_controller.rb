class Api::V1::User::MessagesController < Api::V1::User::Base
  def create
    if params[:message][:content] || params[:message][:image]
      if Entry.where(:user_id => current_user.id, :room_id => params[:message][:room_id]).present?
        @message = Message.create(params.require(:message).permit(:room_id, :content, :image).merge(user_id: current_user.id))
        if @message.save
          @room = Room.find(params[:message][:room_id])
          @entries = @room.entries.eager_load(:user)
          @messages = @room.messages.eager_load(:user).order("messages.created_at DESC").page(params[:page] ||=1).per(10)
          render 'create', handlers: 'jbuilder'

          entry = Entry.where(room_id: @room.id).where.not(user_id: current_user.id)
          user = User.find(*entry.pluck(:user_id))
          @message.create_notification_message!(current_user, user)
        end
      end
    else
      render json: {status: 400}
    end
  end
end