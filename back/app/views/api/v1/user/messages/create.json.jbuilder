json.room do
  json.id(@room.id)
  
  json.messages do
    json.array! @messages do |message|
      json.id(message.id)
      json.user_id(message.user_id)
      json.room_id(message.room_id)
      json.content(message.content)
      json.image(message.image)
      json.created_at(message.created_at.strftime('%Y/%m/%d %H:%M'))
      json.nickname(message.user.nickname)
      json.icon(message.user.image)
    end
  end

  json.users do
    json.array! @entries do |entry|
      json.id(entry.user.id)
      json.nickname(entry.user.nickname)
      json.icon(entry.user.image)
    end
  end
end
json.page_length @messages.total_pages