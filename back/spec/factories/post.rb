FactoryBot.define do
  factory :post do
    title {Faker::Lorem.word}
    content {Faker::Lorem.characters}
  end
end