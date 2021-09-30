6.times do |n|
  user = User.find(n + 1)
  post = Post.find(n + 2)
  Favorite.create!(
    {
      user_id: user.id,
      post_id: post.id,
    }
  )
end
