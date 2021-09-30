6.times do |n|
  user = User.find(n + 1)
  post = User.find(n + 2)
  Favorite.create!([
    {
      user: user.id,
      post_id: post.id,
    }
  ])
end
