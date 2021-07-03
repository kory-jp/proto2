2.times do |n|
  User.all.each do |user|
    Post.all.each do |post|
      Comment.create!(
        user_id: user.id,
        post_id: post.id,
        comment: "テストコメント#{n + 1}です"
      )
    end
  end
end
