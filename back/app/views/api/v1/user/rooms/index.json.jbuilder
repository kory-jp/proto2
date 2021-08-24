json.rooms do
  json.array! @rooms do |room|
    json.id(room.id)
    other_user = room.entries.find{|n| n.user_id != current_user.id}.user
    json.user_id(other_user.id)
    json.nickname(other_user.nickname)
    json.icon(other_user.image)
    message = room.messages.order(created_at: :desc).limit(1)
    message_arr = *message.pluck(:content)
    json.message(message_arr[0])
    created_at_arr = *message.pluck(:created_at)
    if created_at_arr[0] != nil
      json.created_at(created_at_arr[0].strftime('%Y/%m/%d %H:%M'))
    else
      json.created_at("")
    end
  end
end
json.page_length @total_pages