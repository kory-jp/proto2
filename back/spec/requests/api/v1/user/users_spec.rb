require 'rails_helper'

RSpec.describe "Api::V1::User::Users", type: :request do
  describe "その他のユーザー" do
    USERS_URL = "/api/v1/user/users/"
    before do
      @current_user = create(:user)
      @post = create(:post, user: @current_user)
      @other_user = create(:user)
      create_list(:post, 11, user: @other_user)
      post "/api/v1/user/login",
      params:  @current_user_session_params = {
        user: {
          email: @current_user.email,
          password: @current_user.password,
        }
        };
      end

    describe "情報取得" do
      example "ユーザープロフィール情報取得" do
        get "#{USERS_URL}#{@other_user.id}"
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["id", "email", "name", "nickname", "password_digest", "suspended", "introduction", "image", "created_at", "updated_at"]
        expect(response).to have_http_status(:ok)
      end

      example "投稿記事一覧を最大10件づつ取得 " do
        get "#{USERS_URL}#{@other_user.id}/posts"
        res = JSON.parse(response.body)
        expect(res["posts"].length).to eq 10
        expect(res["posts"][0].keys).to eq ["id", "user_id", "title", "content", "image", "created_at", "tags",]
        expect(response).to have_http_status(:ok)
      end

      describe "高評価記事 " do
        before do
        # 高評価記事テストデータ1件作成
          post "/api/v1/user/posts/#{@post.id}/favorites",
            params: favorite_params = {
              favorites: {
                post_id: @post.id,
              }
            };
        end
        example "高評価記事一覧を1件取得" do
          get "#{USERS_URL}#{@current_user.id}/favorite_posts"
          res = JSON.parse(response.body)
          expect(res["posts"].length).to eq 1
          expect(res["posts"][0].keys).to eq ["id", "user_id", "nickname", "title", "content", "image", "created_at", "tags",]
          expect(res["posts"][0]["id"]).to eq(@post.id)
          expect(res["posts"][0]["title"]).to eq(@post.title)
          expect(res["posts"][0]["content"]).to eq(@post.content)
          expect(response).to have_http_status(:ok)
        end
      end

      describe "フォロー" do
        before do
          # @current_userが@other_userをフォロー
          post "/api/v1/user/accounts/relationships",
          params: @current_user_following_params = {
            user_id: @other_user.id,
          };
        end

        example "フォロワー一覧(1件)取得" do
          get "#{USERS_URL}#{@other_user.id}/followers"
          res = JSON.parse(response.body)
          expect(res["followers"][0]["id"]).to eq(@current_user.id)
          expect(res["followers"][0]["name"]).to eq(@current_user.name)
          expect(res["followers"][0].keys).to eq ["id", "name", "nickname", "introduction", "image"]
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end
end
