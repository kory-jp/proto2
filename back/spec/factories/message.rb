FactoryBot.define do
  factory :message do
    content {Faker::Lorem.characters}
  end
end