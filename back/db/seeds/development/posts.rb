11.times do |n|
  User.all.each do |user|
    Post.create!(
      user_id: user.id,
      title: "テスト#{n + 1}",
      content: "テスト#{n + 1}です",
    )
  end
end
