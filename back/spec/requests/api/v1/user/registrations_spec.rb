require 'rails_helper'

RSpec.describe "Api::V1::User::Registrations", type: :request do

  describe "パスワード" do
    it "文字列を与えると、password_digestは長さ60の文字列になる" do
      user = User.new
      user.password = "password"
      expect(user.password_digest).to be_kind_of(String)
      expect(user.password_digest.size).to eq(60) 
    end
    it "nilを与えると、password_digestはnilになる" do
      user = User.new(password_digest: "x")
      user.password = nil
      expect(user.password_digest).to be_nil
    end
  end

  describe "新規登録" do
    subject { post api_v1_user_signup_url, params: user_registration_params}
    let(:user_registration_params) {{
      user: {
        name: "山田太郎",
        nickname: "yamada",
        email: "sample10@example.com",
        password: "password",
      }
    }}
    let(:other_user){create(:user)}
    context "適切な名前、ニックネーム、メールアドレス、パスワード、パスワード(確認用)を入力した場合" do
      it "成功" do
        subject
        expect(response.status).to eq(200)
      end
    end

    context "メールアドレスが未入力の場合" do
      let(:user_registration_params) {{
        user: {
          email: nil
        }
      }}
      it "失敗" do
        subject
        res = JSON.parse(response.body)
        expect(res["status"]).to eq(400)
      end
    end

    context "メールアドレスが重複ししている場合" do
      let(:user_registration_params) {{
        user: {
          email: other_user.email
        }
      }}
      it "失敗" do
        subject
        res = JSON.parse(response.body)
        expect(res["status"]).to eq(400)
      end
    end
  end
end
