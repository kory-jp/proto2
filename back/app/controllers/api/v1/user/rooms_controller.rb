class Api::V1::User::RoomsController < Api::V1::User::Base
  def create
    @room = Room.create
    current_user_entry = Entry.create(:room_id => @room.id, :user_id => current_user.id)
    users_entry = Entry.create(params.require(:room).permit(:user_id, :room_id).merge(:room_id => @room.id))
    if @room.save
      if current_user_entry.save
        if users_entry.save
          messageArray = []
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
            },
            page_length: 1
          }
        end
      end
    end
  end

  def show
    @room = Room.find(params[:id])
    if Entry.where(user_id: current_user.id, room_id: @room.id).present?
      messages = @room.messages.page(params[:page] ||=1).per(10).order("created_at DESC").reverse
      messagePage = Message.where(room_id: params[:id])
      page_length = messagePage.page(1).per(10).total_pages
      messageArray = []
      messages.each do |message|
        messageObj = {}
        messageObj["id"] = message.id
        messageObj["user_id"] = message.user_id
        messageObj["room_id"] = message.room_id
        messageObj["content"] = message.content
        messageObj["image"] = message.image
        messageObj["created_at"] = message.created_at.strftime('%Y/%m/%d %H:%M')
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
        },
        page_length: page_length
      }
    end
  end

end
