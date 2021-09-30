User.create!([
  {
    email: "guest-user@example.com",
    name: "ゲストユーザー",
    nickname: "guest-user",
    password: "guestpassword",
    password_confirmation: "guestpassword",
    introduction: "ゲストユーザーです。"
  },
  {
    email: "sample@example.com",
    name: "佐藤二郎",
    nickname: "佐藤二郎",
    password: "password",
    password_confirmation: "password",
    introduction: "こんにちは!今年から税理士事務所に努めている会計初心者です。\n目指せ税理士試験合格!",
    image: File.open("db/fixures/seed/production/users/user_men_1.jpg"),
  },
  {
    email: "sample1@example.com",
    name: "山田太郎",
    nickname: "山田太郎",
    password: "password",
    password_confirmation: "password",
    introduction: "東京で税理士として20年働いている山田です。\n新米会計事務員を応援します!",
    image: File.open("db/fixures/seed/production/users/user_men_3.jpg"),
  },
  {
    email: "sample2@example.com",
    name: "吉田一郎",
    nickname: "吉田一郎",
    password: "password",
    password_confirmation: "password",
    introduction: "現在、会計事務所で働きながら公認会計士試験に挑戦している吉田です。\n日々の業務や試験に気づきを投稿していきます。",
    image: File.open("db/fixures/seed/production/users/user_men_2.jpg"),
  },
  {
    email: "sample3@example.com",
    name: "田中花子",
    nickname: "田中花子",
    password: "password",
    password_confirmation: "password",
    introduction: "会計業界3年目の田中です。\n税理士試験のうち、簿記論、所得税法の科目合格。学習記録を投稿していきます",
    image: File.open("db/fixures/seed/production/users/user_women_1.jpg"),
  },
  {
    email: "sample4@example.com",
    name: "鈴木愛",
    nickname: "鈴木愛",
    password: "password",
    password_confirmation: "password",
    introduction: "今年から経理課に配属されて、現在、簿記を猛勉強中の鈴木です。\n業務で抱えた不明点を質問させてください！",
    image: File.open("db/fixures/seed/production/users/user_women_2.jpg"),
  }
]
)
