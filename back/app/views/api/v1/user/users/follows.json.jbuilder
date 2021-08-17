json.follows do
  json.array! @users do |user|
    json.id(user.id)
    json.name(user.name)
    json.nickname(user.nickname)
    json.introduction(user.introduction)
    json.image(user.image)
  end
end
#@users.total_pages=> ActionView::Template::Error (undefined method `total_pages' )
json.page_length @page_length