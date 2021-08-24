json.room do
  json.id(@room.id)
  json.messages([])
  json.users do
    json.array! @entries do |entry|
      json.id(entry.user.id)
      json.nickname(entry.user.nickname)
      json.icon(entry.user.image)
    end
  end
end

json.page_length(1)