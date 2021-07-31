FactoryBot.define do
  factory :entry do
    user_id {user.id}
    room_id {room.id}
  end
end