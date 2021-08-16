json.room do
  json.id(@room.id)
  json.messages([])
  json.users do
    json.array! @entries do |entry|
      user = User.find_by(id: entry.user_id)  
      json.id(user.id)
      json.nickname(user.nickname)
      json.icon(user.image)
    end
  end
end

json.page_length(1)