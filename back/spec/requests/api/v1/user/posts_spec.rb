require 'rails_helper'

RSpec.describe "Api::V1::User::Posts", type: :request do
  describe "記事" do
    POST_URL = "/api/v1/user/posts/"
    before do
      @current_user = create(:user)
      @post = create(:post, user: @current_user)
      create_list(:post, 11, user: @current_user)
      @other_user = create(:user)
      @other_post = create(:post, user: @other_user)

      post "/api/v1/user/login",
      params:  @current_user_session_params = {
          user: {
            email: @current_user.email,
            password: @current_user.password,
          }
        };
    end

    describe "記事取得" do
      describe "一覧取得" do
        example "記事内容、ユーザー情報、タグ情報を含んだ記事データを最大10件づつ取得" do
          get "#{POST_URL}"
          res = JSON.parse(response.body)
          expect(res["posts"].length).to eq 10
          expect(res["posts"][0].keys).to eq ["id", "user_id", "title", "content", "image", "created_at", "tags", "name", "nickname"]
          expect(response).to have_http_status(:ok)
        end
      end

      describe "詳細取得" do
        example "記事内容、ユーザー情報、タグ情報を含んだ記事データを1件取得" do
          get "#{POST_URL}#{@post.id}"
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["id", "user_id", "title", "content", "image", "created_at", "tags", "name", "nickname", "user_icon"]
          expect(response).to have_http_status(:ok)
        end
      end
    end

    describe "新規投稿" do
      context "成功" do
        example "必須項目(タイトル、コンテンツ)を入力した場合、投稿成功" do
          post "#{POST_URL}",
          params: post_params_hash = {
            post: {
              title: "テスト",
              content: "テスト",
              user_id: @current_user.id
            }
          }
          res = JSON.parse(response.body)
          expect(res["title"]).to eq("テスト")
          expect(res["content"]).to eq("テスト")
          expect(response).to have_http_status(:ok)
        end

        example "入力可能項目(タイトル、コンテンツ、画像、タグ)以外を入力した場合、その値は保存されない" do
          post "#{POST_URL}",
          params: post_params_hash = {
            post: {
              title: "テスト1",
              content: "テスト1",
              user_id: @current_user.id,
              date: 2000/01/01,
            }
          }
          res = JSON.parse(response.body)
          expect(res["title"]).to eq("テスト1")
          expect(res["content"]).to eq("テスト1")
          expect(res["date"]).to eq(nil)
          expect(response).to have_http_status(:ok)
        end
      end

      context "失敗" do
        example "必須項目が未入力の場合、投稿失敗" do
          expect {
            post "#{POST_URL}",
            params: post_params_hash = {
              post: {
                title: "",
                content: "テスト",
                user_id: @current_user.id
              }
            }
          }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end

    describe "更新" do
      describe "権限確認" do
        context "権限有り" do
          example "作成者が自分の記事を編集しようとするとt'true'を受け取る" do
            get "#{POST_URL}#{@post.id}/auth"
            res = JSON.parse(response.body)
            expect(res).to eq(true)
            expect(response).to have_http_status(:ok)
          end
        end

        context "権限無し" do
          example "作成者でないユーザーが記事を編集しようとすると'false'を受け取る" do
            get "#{POST_URL}#{@other_post.id}/auth"
            res = JSON.parse(response.body)
            expect(res).to eq(false)
            expect(response).to have_http_status(:ok)
          end
        end
      end

      describe "編集内容入力" do
        context "正しく入力した場合" do
          example "必須項目を入力した場合,保存に成功" do
            patch "#{POST_URL}#{@post.id}",
            params: update_post_params_hash = {
              post: {
                title: "更新テスト",
                content: "更新テスト",
                user_id: @current_user.id,
              }
            }
            res = JSON.parse(response.body)
            expect(res["title"]).to eq("更新テスト")
            expect(res["content"]).to eq("更新テスト")
            expect(response).to have_http_status(:ok)
          end
        end

        context "謝った入力をした場合" do
          example "必須項目の未入力の場合、編集失敗" do
            expect {
              patch "#{POST_URL}#{@post.id}",
              params: post_params_hash = {
                post: {
                  title: "",
                  content: "",
                  user_id: @current_user.id
                }
              }
            }.to raise_error(ActiveRecord::RecordInvalid)
          end

          example "入力可能項目(タイトル、コンテンツ、画像、タグ)以外を入力した場合、その値は更新されない" do
            patch "#{POST_URL}#{@post.id}",
            params: post_params_hash = {
              post: {
                title: "更新テスト1",
                content: "更新テスト1",
                user_id: @current_user.id,
                date: 2000/01/01,
              }
            }
            res = JSON.parse(response.body)
            expect(res["title"]).to eq("更新テスト1")
            expect(res["content"]).to eq("更新テスト1")
            expect(res["date"]).to eq(nil)
            expect(response).to have_http_status(:ok)
          end
        end
      end
    end

    describe "削除" do
      context "削除権限がある場合" do
        example "削除に成功" do
          expect(delete "#{POST_URL}#{@post.id}").to eq(200)
        end
      end

      context "削除権限がない場合" do
        example "削除に失敗" do
          expect(delete "#{POST_URL}#{@other_post.id}").to eq(400)
        end
      end
    end
  end
end
