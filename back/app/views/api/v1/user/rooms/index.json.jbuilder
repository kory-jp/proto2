# json.rooms do
#   json.array! @entries do |entry|
#     room = Room.find(entry.room_id)
#     json.id(room.id)
#     other_entry = room.entries.where.not(user_id: current_user.id)
#     user = User.find(other_entry[0].user_id)
#     json.user_id(user.id)
#     json.nickname(user.nickname)
#     json.icon(user.image)
#     message = room.messages.order(created_at: :desc).limit(1)
#     message_arr = *message.pluck(:content)
#     json.message(message_arr[0])
#     created_at_arr = *message.pluck(:created_at)
#     if created_at_arr[0] != nil
#       json.created_at(created_at_arr[0].strftime('%Y/%m/%d %H:%M'))
#     else
#       json.created_at("")
#     end
#   end
# end
# json.page_length @entries.total_pages

json.rooms do
  json.array! @rooms do |room|
    json.id(room.id)
    other_entry = (room.entries.to_a).select{|n| n.user_id != current_user.id}
    other_user = User.find(other_entry[0].user_id)
    json.user_id(other_user.id)
    json.nickname(other_user.nickname)
    json.icon(other_user.image)
    json.message(room.messages.last.content)
    if room.messages.last != nil
      json.created_at(room.messages.last.created_at.strftime('%Y/%m/%d %H:%M'))
    else
      json.created_at("")
    end
  end
end