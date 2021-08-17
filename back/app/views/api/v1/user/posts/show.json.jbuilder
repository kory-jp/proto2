json.id(@post.id)
json.user_id(@post.user_id)
json.title(@post.title)
json.content(@post.content)
json.image(@post.image)
json.created_at(@post.created_at.strftime('%Y/%m/%d'))
tags = @post.tags
json.tags do
  json.array! tags do |tag|
    json.id(tag.id)
    json.value(tag.value)
    json.label(tag.label)
  end
end
user = User.find_by(id: @post.user_id)
json.name(user.name)
json.nickname(user.nickname)
json.user_icon(user.image)