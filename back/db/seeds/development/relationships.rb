4.times do |n|
  Relationship.create!(
    following_id: n + 1,
    follower_id: n + 2
  )
end
