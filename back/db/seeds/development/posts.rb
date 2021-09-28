11.times do |n|
  User.all.each do |user|
    Post.create!(
      user_id: user.id,
      title: "テスト#{n + 1}",
      content: "テスト#{n + 1}です",
    )
  end
end

Post.create!(
  user_id: 1,
  title: "本番テスト",
  content: "本番テストです。\n本番テストです。\n\n本番テストです"
)