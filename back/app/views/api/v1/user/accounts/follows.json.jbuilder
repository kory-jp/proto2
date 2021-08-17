json.follows do
  json.array! @users, :id, :name, :nickname, :introduction, :image
end

json.page_length @users.total_pages