class Api::V1::User::MessagesController < Api::V1::User::Base
  def create
    if Entry.where(:user_id => params[:message][:user_id], :room_id => params[:message][:room_id]).present?
      @message = Message.create(params.require(:message).permit(:user_id, :room_id, :content, :image))
      if @message.save
        @room = Room.find(params[:message][:room_id])
        messages = @room.messages.limit(15).order("created_at DESC").reverse
        messageArray = []
        messages.each do |message|
          messageObj = {}
          messageObj["id"] = message.id
          messageObj["user_id"] = message.user_id
          messageObj["room_id"] = message.room_id
          messageObj["content"] = message.content
          messageObj["image"] = message.image
          messageObj["created_at"] = message.created_at.strftime('%Y/%m/%d')
          user = User.find_by(id: message.user_id)
          user_nickname = user.nickname
          messageObj["nickname"] = user_nickname
          user_icon = user.image
          messageObj["icon"] = user_icon
          messageArray.push(messageObj)
        end
  
        entries = @room.entries
        userArray = []
        entries.each do |entry|
          user = User.find_by(id: entry.user_id)
          userObj = {}
          userObj["id"] = user.id
          userObj["nickname"] = user.nickname
          userObj["icon"] = user.image
          userArray.push(userObj)
        end
  
        render json: {
          room: {
            id: @room.id,
            messages: messageArray,
            users: userArray
          }
        }
      end
    end
  end
end
