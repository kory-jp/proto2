json.notifications do
  json.array! @notifications do |notification|
    json.id(notification.id)
    json.visited_id(notification.visited_id)
    json.visitor_id(notification.visitor_id)
    json.post_id(notification.post_id)
    json.comment_id(notification.comment_id)
    json.room_id(notification.room_id)
    json.message_id(notification.message_id)
    json.nickname(notification.visitor.nickname)
    json.icon(notification.visitor.image)
    json.created_at(notification.created_at.strftime('%Y/%m/%d %H:%M'))
    json.checked(notification.checked)
    json.action(notification.action)
  end
end

json.page_length @notifications.total_pages