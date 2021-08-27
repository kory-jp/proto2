require 'rails_helper'

RSpec.describe "Api::V1::User::Accounts", type: :request do
  describe "アカウント" do
    ACCOUNTS_URL = "/api/v1/user/accounts/"
    before do
      @current_user = create(:user)
      @other_user = create(:user)
      @following_user = create(:user)
      @post = create(:post, user: @current_user)
      login(@current_user)
    end

    describe "アカウント情報取得" do
      before do
        # 高評価記事テストデータ作成
        post "/api/v1/user/posts/#{@post.id}/favorites", params: current_user_favorite_params = {
          favorites: {
            user_id: @current_user.id,
            post_id: @post.id,
          }
        };

        post "#{ACCOUNTS_URL}/relationships", params: current_user_following_params = {
          user_id: @following_user.id,
        };
      end
      describe "投稿記事" do
        subject { get "#{ACCOUNTS_URL}#{@current_user.id}/myposts"}
        before do
          create_list(:post, 4, user: @current_user)
        end
        it  "current_userの投稿記事一覧を取得できる" do
          subject
          res = JSON.parse(response.body)
          # L18にて高評価記事の初期データ作成時に既に1記事作成済み
          expect(res["posts"].length).to eq 5
          expect(res["posts"][0].keys).to eq ["id", "user_id", "title", "content", "image", "created_at", "tags",]
          expect(response).to have_http_status(:ok)
        end
      end

      describe "高評価記事" do
        subject {get "#{ACCOUNTS_URL}#{@current_user.id}/favorite_posts"}
        it "current_userの高評価記事一覧を取得できる" do
          subject
          res = JSON.parse(response.body)
          # L18で1個初期データを作成
          expect(res["posts"].length).to eq 1
          expect(res["posts"][0].keys).to eq ["id", "user_id", "nickname", "title", "content", "image", "created_at", "tags",]
          expect(response).to have_http_status(:ok)
        end
      end

      describe "フォロー" do
        subject { get "#{ACCOUNTS_URL}follows"}
        it "current_userのフォローユーザー一覧を取得できる" do
          subject
          res = JSON.parse(response.body)
          res = res["follows"][0]
          expect(res["id"]).to eq(@following_user.id)
          expect(res["name"]).to eq(@following_user.name)
          expect(res["nickname"]).to eq(@following_user.nickname)
          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "アカウント情報更新" do
      describe "編集権限確認" do
        subject { get "#{ACCOUNTS_URL}#{edit_account_id}/edit"}
        context "正しいアカウントからアクセスした場合" do
          let(:edit_account_id) {@current_user.id}
          it "現在のユーザー情報を取得できる" do
            subject
            res = JSON.parse(response.body)
            expect(res.keys).to eq ["name", "nickname", "email", "introduction", "image"]
            expect(response).to have_http_status(:ok)
          end
        end

        context "不正なアカウントからアクセスした場合" do
          let(:edit_account_id) {@other_user.id}
          it "現在のユーザー情報を取得できない" do
            subject
            res = JSON.parse(response.body)
            expect(res["message"]).to eq "正しいアカウントでログインしてください"
          end
        end
      end

      describe "編集操作" do
        subject { patch "#{ACCOUNTS_URL}", params: update_params_hash}
        let(:update_params_hash) {{
          user: {
            name: @current_user.name,
            nickname: @current_user.nickname,
            email: @current_user.email,
            introduction: @current_user.introduction,
          }
        }}
        context "必須項目が入力されている場合" do
          let(:update_params_hash) {{
            user: {
              email: "test@example.com"
            }
          }}
          it "更新成功" do
            subject
            res = JSON.parse(response.body)
            expect(res["email"]).to eq("test@example.com")
            expect(response).to have_http_status(:ok)
          end
        end

        context "必須項目が空欄の場合" do
          let(:update_params_hash) {{
            user: {
              email: nil
            }
          }}
          it  "更新されない(レスポンスを受け取れない)" do
            subject
            res = JSON.parse(response.body)
            expect(res["message"]).to eq "入力項目に誤りがあります"
          end
        end
      end
    end

    describe "アカウント削除" do
      subject { post "#{ACCOUNTS_URL}", params: current_user_delete_params_hash}
      let(:current_user_delete_params_hash) {{
        user: {
          password: @current_user.password
        }
      }}
      context "正しい認証用のパスワードが入力されている場合" do
        it  "アカウント削除成功" do
          subject
          expect(response.body).to eq("ok")
        end
      end
      context "認証用のパスワードが未入力の場合" do
        let(:current_user_delete_params_hash) {{
          user: {
            password: nil
          }
        }}
        it  "アカウント削除失敗" do
          subject
          expect(response.body).to eq("ng")
        end
      end
    end
  end
end
