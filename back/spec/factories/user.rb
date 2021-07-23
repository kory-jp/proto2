FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    nickname { Faker::Name.name }
    sequence(:email) {|n| "#{n}_" + Faker::Internet.email }
    password { "password" }
    introduction {Faker::Lorem.characters}
  end
end