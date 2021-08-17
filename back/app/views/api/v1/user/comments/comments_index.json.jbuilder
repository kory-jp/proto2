json.comments do
  json.array! @comments do |comment|
    json.id(comment.id)
    json.post_id(comment.post_id)
    json.user_id(comment.user_id)
    user = User.find_by(id: comment.user_id)
    json.name(user.name)
    json.nickname(user.nickname)
    json.icon(user.image)
    json.comment(comment.comment)
    json.created_at(comment.created_at.strftime('%Y/%m/%d'))
  end
end

json.page_length @comments.total_pages