require 'rails_helper'

RSpec.describe "Api::V1::User::Searches", type: :request do
  describe "検索" do
    SEARCH_URL = "/api/v1/user/search"
    before do
      @current_user = create(:user)
      @post = create(:post, user: @current_user)
    end

    describe "ユーザー検索" do
      before do
        @search_user_params_hash = {
          search: {
            model: 'user',
            value: "#{@current_user.nickname}"
          }
        }
      end
      context "ユーザーモデルを選択した場合" do
        example "ユーザー検索成功" do
          post "#{SEARCH_URL}", params: @search_user_params_hash
          res = JSON.parse(response.body)
          expect(res["users"][0]["id"]).to eq(@current_user.id)
          expect(res["users"][0]["name"]).to eq(@current_user.name)
          expect(res["users"][0]["email"]).to eq(@current_user.email)
          expect(response).to have_http_status(:ok)
        end
      end
      context "ポストモデルを選択した場合" do
        example "ユーザー検索失敗" do
          @search_user_params_hash[:search].merge!(model: 'post')
          post "#{SEARCH_URL}", params: @search_user_params_hash
          expect(response.body["users"]).to eq(nil)
        end
      end
    end

    describe "投稿検索" do
      before do
        @search_post_params_hash = {
          search: {
            model: 'post',
            value: "#{@post.title}"
          }
        }
      end
      context "ポストモデルを選択した場合" do
        example "投稿検索成功" do
          post "#{SEARCH_URL}", params: @search_post_params_hash
          res = JSON.parse(response.body)
          expect(res["posts"][0]["id"]).to eq(@post.id)
          expect(res["posts"][0]["title"]).to eq(@post.title)
          expect(res["posts"][0]["content"]).to eq(@post.content)
          expect(response).to have_http_status(:ok)
        end
      end
      context "ユーザーモデルを選択した場合" do
        example "投稿検索成功" do
          @search_post_params_hash[:search].merge!(model: 'user')
          post "#{SEARCH_URL}", params: @search_post_params_hash
          expect(response.body["posts"]).to eq(nil)
        end
      end
    end
  end
end
