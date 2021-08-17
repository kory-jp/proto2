class Api::V1::User::MessagesController < Api::V1::User::Base
  def create
    if params[:message][:content] || params[:message][:image]
      if Entry.where(:user_id => params[:message][:user_id], :room_id => params[:message][:room_id]).present?
        @message = Message.create(params.require(:message).permit(:user_id, :room_id, :content, :image))
        if @message.save
          @room = Room.find(params[:message][:room_id])
          @messages = @room.messages.page(params[:page] ||=1).per(10).order("created_at ASC")
          render 'create', handlers: 'jbuilder'

          current_user = User.find(params[:message][:user_id])
          entry = Entry.where(room_id: @room.id).where.not(user_id: current_user.id)
          user = User.find(*entry.pluck(:user_id))
          @message.create_notification_message!(current_user, user)
        end
      end
    end
  end
end
