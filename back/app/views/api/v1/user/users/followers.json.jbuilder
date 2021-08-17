json.followers do
  json.array! @users do |user|
    json.id(user.id)
    json.name(user.name)
    json.nickname(user.nickname)
    json.introduction(user.introduction)
    json.image(user.image)
  end
end
json.page_length @page_length