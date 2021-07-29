Room.create! 
@room = Room.find(1)

@room.entries.create! ([
  {
    id: 1,
    user_id: 1,
    room_id: 1,
  },
  {
    id: 2,
    user_id: 5,
    room_id: 1,
  }
])
@room.messages.create! ([
  {
    id: 1,
    user_id: 1,
    room_id: 1,
    content: "こんにちはsatoです"
  },
  {
    id: 2,
    user_id: 5,
    room_id: 1,
    content: "初めまして鈴木です"
  },
  {
    id: 3,
    user_id: 1,
    room_id: 1,
    content: "これはsatoのテストメッセージです"
  },
  {
    id: 4,
    user_id: 5,
    room_id: 1,
    content: "鈴木のテストメッセージです"
  },
])