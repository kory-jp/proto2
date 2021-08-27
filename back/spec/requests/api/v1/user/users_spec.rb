require 'rails_helper'

RSpec.describe "Api::V1::User::Users", type: :request do
  describe "その他のユーザー" do
    USERS_URL = "/api/v1/user/users/"
    before do
      @current_user = create(:user)
      @post = create(:post, user: @current_user)
      @other_user = create(:user)
      create_list(:post, 11, user: @other_user)
      login(@current_user)
      end

    describe "ユーザー情報取得" do
      describe "ユーザープロフィール" do
        subject {get "#{USERS_URL}#{@other_user.id}"}
        it "情報取得" do
          # get "#{USERS_URL}#{@other_user.id}"
          subject
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["id", "name", "nickname", "introduction", "image"]
          expect(response).to have_http_status(:ok)
        end
      end

      describe "投稿記事一覧" do
        subject {get "#{USERS_URL}#{@other_user.id}/posts"}
        it "最大10件づつ取得 " do
          # get "#{USERS_URL}#{@other_user.id}/posts"
          subject
          res = JSON.parse(response.body)
          expect(res["posts"].length).to eq 10
          expect(res["posts"][0].keys).to eq ["id", "user_id", "title", "content", "image", "created_at", "tags",]
          expect(response).to have_http_status(:ok)
        end
      end

      describe "高評価記事 " do
        subject {get "#{USERS_URL}#{@current_user.id}/favorite_posts"}
        before do
        # 高評価記事テストデータ1件作成
          post "/api/v1/user/posts/#{@post.id}/favorites", params: favorite_params = {
              favorites: {
                post_id: @post.id,
              }
            };
        end
        it "高評価記事一覧を1件取得" do
          # get "#{USERS_URL}#{@current_user.id}/favorite_posts"
          subject
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
        subject {get "#{USERS_URL}#{@other_user.id}/followers"}
        before do
          # @current_userが@other_userをフォロー
          post "/api/v1/user/accounts/relationships", params: @current_user_following_params = {
            user_id: @other_user.id,
          };
        end

        it "フォロワー一覧(1件)取得" do
          # get "#{USERS_URL}#{@other_user.id}/followers"
          subject
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
