6.times do |n|
  current_user = User.find(n + 1)
  other_user = User.find(n + 2 > 6 ? 1 : n + 2)

  Relationship.create!(
    following_id: current_user.id,
    follower_id: other_user.id,
  )
end