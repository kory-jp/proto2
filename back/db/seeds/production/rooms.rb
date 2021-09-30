6.times do |n|
  current_user = User.find(n + 1)
  other_user = User.find(n + 2 > 6 ? 1 : n + 2)
  Room.create!
  room = Room.find(n + 1)

  room.entries.create! ([
    {
      user_id: current_user.id,
      room_id: room.id,
    },
    {
      user_id: other_user.id,
      room_id: room.id,
    }
  ])
  room.messages.create! ([
    {
      user_id: current_user.id,
      room_id: room.id,
      content: "こんにちは#{current_user.nickname}です"
    },
    {
      user_id: other_user.id,
      room_id: room.id,
      content: "初めまして#{other_user.nickname}です"
    },
  ])
end