FactoryBot.define do
  factory :comment do
    comment {Faker::Lorem.characters}
  end
end