require 'rails_helper'

RSpec.describe "Api::V1::User::Sessions", type: :request do
  describe "ログイン" do
    describe "パスワード" do
      example "正しいパスワードならtrueを返す" do
        user = build(:user)
        expect(user.authenticate("password")).to be_truthy
      end

      example "謝ったパスワードならfalseを返す" do
        user = build(:user)
        expect(user.authenticate("pass")).to be_falsey
      end

      example "パスワード未設定ならfalseを返す" do
        user = build(:user)
        expect(user.authenticate(nil)).to be_falsey
      end
    end

    describe "ログインアクション" do
      before do
        @user = create(:user)
        @user_session_params = {
          user: {
            email: @user.email,
            password: @user.password
          }
        }
      end
      context "正しい情報を入力" do
        example "正しいメールアドレスとパスワードの場合、ログイン成功" do
          post "/api/v1/user/login", params: @user_session_params
          expect(response.status).to eq(200)
        end
      end

      context "謝った情報を入力" do
        example "謝ったメールアドレスを入力した場合、ログイン失敗" do
          post "/api/v1/user/login", 
          params: @user_session_params = {
            user: {
              email: @user.email,
              password: " ",
            }
          }
          expect(response.status).not_to eq(200)
        end
      end

      example "ログインが成功していればユーザー情報を取得できる" do
        post "/api/v1/user/login", params: @user_session_params
        get "/api/v1/user/logged_in"
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "email", "name", "nickname", "password_digest", "suspended", "introduction", "image", "created_at", "updated_at"]
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
