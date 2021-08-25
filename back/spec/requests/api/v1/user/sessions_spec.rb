require 'rails_helper'

RSpec.describe "Api::V1::User::Sessions", type: :request do
  describe "ログイン" do
    describe "パスワード" do
      example "正しいパスワードならtrueを返す" do
        user = build(:user)
        expect(user.authenticate("password")).to be_truthy
      end

      example "誤ったパスワードならfalseを返す" do
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

      context "誤った情報を入力" do
        example "誤ったメールアドレスを入力した場合、ログイン失敗" do
          post "/api/v1/user/login", 
          params: @user_session_params = {
            user: {
              email: @user.email,
              password: " ",
            }
          }
          res = JSON.parse(response.body)
          expect(res["message"]).to eq("ログインに失敗しました")
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

    describe "アクセス制限" do
      before do
        @current_user = create(:user)
        post "/api/v1/user/login",
        params:  @current_user_session_params = {
            user: {
              email: @current_user.email,
              password: @current_user.password,
            }
          };
      end
      context "60分操作がない場合" do
        example "ユーザー情報取得" do
          travel_to 60.minutes.after do
            get "/api/v1/user/logged_in"
            res = JSON.parse(response.body)
            expect(res["id"]).to eq(@current_user.id)
          end
        end
      end

      context "61分操作がない場合" do
        example "セッションタイムアウト" do
          travel_to 61.minutes.after do
            get "/api/v1/user/logged_in"
            res = JSON.parse(response.body)
            expect(res["message"]).to eq("セッションタイムアウト")
          end
        end
      end
    end
  end
end
