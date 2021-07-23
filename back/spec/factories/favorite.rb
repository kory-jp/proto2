FactoryBot.define do
  factory :favorite do
    association :user
    user {post.user}
    association :post
    post {user.post}
  end
end