6.times do |n|
  current_user = User.find(n + 1)
  other_user = User.find(n + 2 > 6 ? 1 : n + 2)
  post = other_user.posts[0]
  comments = post.comments.where(user_id: current_user.id)
  room = Room.find(n + 1)
  messages = room.messages.where(user_id: current_user.id)

  Notification.create!(
    visitor_id: current_user.id,
    visited_id: other_user.id,
    post_id: post.id,
    action: 'favorite',
    checked: 0,
  )

  Notification.create!(
    visitor_id: current_user.id,
    visited_id: other_user.id,
    action: 'follow',
    checked: 0,
  )

  Notification.create!(
    visitor_id: current_user.id,
    visited_id: other_user.id,
    room_id: room.id,
    message_id: messages[0].id,
    action: 'message',
    checked: 0,
  )
end