require 'rails_helper'

RSpec.describe "Api::V1::User::Accounts", type: :request do
  describe "アカウント" do
    ACCOUNTS_URL = "/api/v1/user/accounts/"
    before do
      @current_user = create(:user)
      @following_user = create(:user)
      @post = create(:post, user: @current_user)

      post "/api/v1/user/login",
      params:  @current_user_session_params = {
          user: {
            email: @current_user.email,
            password: @current_user.password,
          }
        };
    end

    describe "アカウント情報取得" do
      before do
        # 高評価記事テストデータ作成
        post "/api/v1/user/posts/#{@post.id}/favorites",
        params: @current_user_favorite_params = {
          favorites: {
            user_id: @current_user.id,
            post_id: @post.id,
          }
        };

        post "#{ACCOUNTS_URL}/relationships",
        params: @current_user_following_params = {
          user_id: @following_user.id,
        };
      end
      describe "投稿記事" do
        before do
          create_list(:post, 4, user: @current_user)
        end
        example "current_userの投稿記事一覧を取得できる" do
          get "#{ACCOUNTS_URL}#{@current_user.id}/myposts"
          res = JSON.parse(response.body)
          # L18にて高評価記事の初期データ作成時に既に1記事作成済み
          expect(res["posts"].length).to eq 5
          expect(res["posts"][0].keys).to eq ["id", "user_id", "title", "content", "image", "created_at", "tags",]
          expect(response).to have_http_status(:ok)
        end
      end

      describe "高評価記事" do
        example "current_userの高評価記事一覧を取得できる" do
          get "#{ACCOUNTS_URL}#{@current_user.id}/favorite_posts"
          res = JSON.parse(response.body)
          # L18で1個初期データを作成
          expect(res["posts"].length).to eq 1
          expect(res["posts"][0].keys).to eq ["id", "user_id", "nickname", "title", "content", "image", "created_at", "tags",]
          expect(response).to have_http_status(:ok)
        end
      end

      describe "フォロー" do
        example "current_userのフォローユーザー一覧を取得できる" do
          get "#{ACCOUNTS_URL}follows"
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
        let(:user) {create(:user)}

        example "ログインユーザーと操作ユーザーが同一であれば、現在のユーザー情報を取得できる" do
          get "#{ACCOUNTS_URL}#{@current_user.id}/edit"
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["id", "email", "name", "nickname", "password_digest", "suspended", "introduction", "image", "created_at", "updated_at"]
          expect(response).to have_http_status(:ok)
        end

        example "同一でないユーザーの場合、現在のユーザー情報を取得できない" do
          get "#{ACCOUNTS_URL}#{user.id}/edit"
          expect(response.body).to eq ""
          expect(response).to have_http_status(204)
        end
      end

      describe "編集操作" do
        before do
          get "#{ACCOUNTS_URL}#{@current_user.id}/edit"
          @current_user_params_hash = {
            user: {
              name: @current_user.name,
              nickname: @current_user.nickname,
              email: @current_user.email,
              introduction: @current_user.introduction,
            }
          }
        end
        example "必要項目が入力されている場合、正しく値が更新される" do
          @current_user_params_hash[:user].merge!(email: "test@example.com")
          patch "#{ACCOUNTS_URL}", params: @current_user_params_hash
          res = JSON.parse(response.body)
          expect(res["email"]).to eq("test@example.com")
          expect(response).to have_http_status(:ok)
        end

        example "必要項目が未入力の場合、更新されない(レスポンスを受け取れない)" do
          @current_user_params_hash[:user].merge!(email: "")
          patch "#{ACCOUNTS_URL}", params: @current_user_params_hash
          expect(response.body).to eq ""
          expect(response).to have_http_status(204)
        end
      end
    end
  end
end
