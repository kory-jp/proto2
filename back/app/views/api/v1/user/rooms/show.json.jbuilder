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
      user = User.find_by(id: message.user_id)
      json.nickname(user.nickname)
      json.icon(user.image)
    end
  end

  entries = @room.entries
  json.users do
    json.array! entries do |entry|
      user = User.find_by(id: entry.user_id)
      json.id(user.id)
      json.nickname(user.nickname)
      json.icon(user.image)
    end
  end
end
# "@messages.total_pages"=>ActionView::Template::Error(undefined method `total_pages' for)が発生
json.page_length @page_length