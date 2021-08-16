json.users do
  json.array! @users do |user|
    json.id(user.id)
    json.name(user.name)
    json.nickname(user.nickname)
    json.email(user.email)
    json.introduction(user.introduction)
    json.image(user.image)
    json.created_at(user.created_at.strftime('%Y/%m/%d'))
  end
end

json.page_length @users.total_pages