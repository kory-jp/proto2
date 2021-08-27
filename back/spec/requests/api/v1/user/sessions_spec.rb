require 'rails_helper'

RSpec.describe "Api::V1::User::Sessions", type: :request do
  describe "ログイン" do
    LOGIN_URL = "/api/v1/user/login"
    LOGGED_IN_URL = "/api/v1/user/logged_in"
    before do
      @current_user = create(:user)
    end
    describe "パスワード" do
      it "正しいパスワードならtrueを返す" do
        user = build(:user)
        expect(user.authenticate("password")).to be_truthy
      end

      it "誤ったパスワードならfalseを返す" do
        user = build(:user)
        expect(user.authenticate("pass")).to be_falsey
      end

      it "パスワード未設定ならfalseを返す" do
        user = build(:user)
        expect(user.authenticate(nil)).to be_falsey
      end
    end

    describe "ログイン" do
      subject {post "#{LOGIN_URL}", params: login_params}
      let(:login_params) {{
        user: {
          email: @current_user.email,
          password: @current_user.password
        }
      }}
      context "正しい情報を入力" do
        it "正しいメールアドレスとパスワードの場合、ログイン成功" do
          subject
          expect(response.status).to eq(200)
        end
      end

      context "誤った情報を入力" do
        let(:login_params) {{
          user: {
            email: @current_user.email,
            password: nil,
          }
        }}
        it "誤ったメールアドレスを入力した場合、ログイン失敗" do
          subject
          res = JSON.parse(response.body)
          expect(res["message"]).to eq("ログインに失敗しました")
        end
      end
    end

    describe "ユーザー情報取得" do
      subject {get "/api/v1/user/logged_in"}
      before do
        login(@current_user)
      end
      context "ログインに成功している場合" do
        it "ユーザー情報の取得" do
          subject
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["id", "email", "name", "nickname", "password_digest", "suspended", "introduction", "image", "created_at", "updated_at"]
          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "アクセス制限" do
      subject {get "/api/v1/user/logged_in"}
      before do
        login(@current_user)
      end
      context "60分操作がない場合" do
        it "ユーザー情報取得" do
          travel_to 60.minutes.after do
            # get "/api/v1/user/logged_in"
            subject
            res = JSON.parse(response.body)
            expect(res["id"]).to eq(@current_user.id)
          end
        end
      end

      context "61分操作がない場合" do
        it "セッションタイムアウト" do
          travel_to 61.minutes.after do
            subject
            res = JSON.parse(response.body)
            expect(res["message"]).to eq("セッションタイムアウト")
          end
        end
      end
    end
  end
end
