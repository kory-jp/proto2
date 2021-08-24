json.posts do
  json.array! @posts do |post|
    json.id(post.id)
    json.user_id(post.user_id)
    json.nickname(post.user.nickname)
    json.title(post.title)
    json.content(post.content)
    json.image(post.image)
    json.created_at(post.created_at.strftime('%Y/%m/%d'))
    tags = post.tags
    json.tags do
      json.array! tags do |tag|
        json.id(tag.id)
        json.value(tag.value)
        json.label(tag.label)
      end
    end
  end
end

json.page_length @posts.total_pages