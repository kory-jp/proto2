5.times do |n|
  User.all.each do |user|
    Post.create!(
      user_id: user.id,
      title: "テスト#{n + 1}",
      content: "テスト#{n + 1}です",
      image: File.open("db/fixures/seed/seed1.jpg"),
    )
  end
end
