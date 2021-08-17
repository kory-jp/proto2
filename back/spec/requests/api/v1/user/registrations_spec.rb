require 'rails_helper'

RSpec.describe "Api::V1::User::Registrations", type: :request do

  describe "パスワード" do
    example "文字列を与えると、password_digestは長さ60の文字列になる" do
      user = User.new
      user.password = "password"
      expect(user.password_digest).to be_kind_of(String)
      expect(user.password_digest.size).to eq(60) 
    end
    example "nilを与えると、password_digestはnilになる" do
      user = User.new(password_digest: "x")
      user.password = nil
      expect(user.password_digest).to be_nil
    end
  end

  describe "新規登録" do
    before do
      @user = create(:user)
      @user_registration_params = {
        user: {
          name: "山田太郎",
          nickname: "yamada",
          email: "sample10@example.com",
          password: "password",
        }
      }
    end
    describe "適切な名前、ニックネーム、メールアドレス、パスワード、パスワード(確認用)を入力すると新規登録が可能" do
      example "すべて適切な値を入力した場合、成功" do
        post "/api/v1/user/signup", params: @user_registration_params
        expect(response.status).to eq(200)
      end

      example "メールアドレスが未入力の場合、失敗" do
        @user_registration_params[:user][:email] = nil
        post "/api/v1/user/signup", params: @user_registration_params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq(400)
      end

      example "メールアドレスが重複している場合、失敗" do
        post "/api/v1/user/signup", params: @user_registration_params
        @other_user_registration_params = {
          user: {
            name: "佐藤一郎",
            nickname: "sato",
            email: "sample10@example.com",
            password: "password",
          }
        }
        post "/api/v1/user/signup", params: @other_user_registration_params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq(400)
      end
    end
  end
end
