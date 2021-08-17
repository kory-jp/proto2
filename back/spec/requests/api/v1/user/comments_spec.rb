require 'rails_helper'

RSpec.describe "Api::V1::User::Comments", type: :request do
  describe "コメント" do
    COMMENT_URL = "/api/v1/user/comments/"
    before do
      @current_user = create(:user)
      @post = create(:post, user: @current_user)
      @current_user_comment = create(:comment, user_id: @current_user.id, post_id: @post.id)
      create_list(:comment, 11, user_id: @current_user.id, post_id: @post.id)
      @other_user = create(:user)
      @other_user_comment = create(:comment, user_id: @other_user.id, post_id: @post.id)

      post "/api/v1/user/login",
      params:  @current_user_session_params = {
          user: {
            email: @current_user.email,
            password: @current_user.password,
          }
        }
    end

    describe "コメント所得" do
      example "コメントを最大10件所得" do
        get "#{COMMENT_URL}#{@post.id}/comments_index"
        res = JSON.parse(response.body)
        expect(res["comments"].length).to eq 10
        expect(res["comments"][0].keys).to eq ["id", "post_id", "user_id", "name", "nickname", "icon", "comment", "created_at"]
        expect(response).to have_http_status(:ok)
      end
    end

    describe "コメント新規投稿" do
      before do
        @comment_params_hash = {
          comment: {
            user_id: @current_user.id,
            post_id: @post.id,
            comment: "テストコメント"
          }
        }
      end
      context "必須項目が入力された場合" do
        example "成功(登録データを受け取れる)" do
          post "#{COMMENT_URL}", params: @comment_params_hash
           res = JSON.parse(response.body)
           expect(res["post_id"]).to eq(@post.id)
           expect(res["user_id"]).to eq(@current_user.id)
           expect(res["comment"]).to eq("テストコメント")
           expect(response).to have_http_status(:ok)
        end
      end

      context "必須項目が未入力の場合" do
        example "失敗(データを受け取れない)" do
          post "#{COMMENT_URL}",
            params: @comment_params_hash = {
              comment: {
                comment: ""
              }
            }
          expect(response.body).to eq("")
        end
      end
    end

    describe "コメント編集" do
      before do
        @edit_comment_params_hash = {
          comment: {
            comment: "テストコメント更新"
          }
        }
      end
      context "作成者が編集を行う場合" do
        example "成功(更新データを受け取れる)" do
          patch "#{COMMENT_URL}#{@current_user_comment.id}", params: @edit_comment_params_hash
           res = JSON.parse(response.body)
           expect(res["post_id"]).to eq(@post.id)
           expect(res["user_id"]).to eq(@current_user.id)
           expect(res["comment"]).to eq("テストコメント更新")
           expect(response).to have_http_status(:ok)
        end
      end

      context "作成者でないユーザーが編集を行う場合" do
        example "失敗(データを受け取れない)" do
          patch "#{COMMENT_URL}#{@other_user_comment.id}", params: @edit_comment_params_hash
          expect(response.body).to eq("")
        end
      end
    end

    describe "コメント削除" do
      context "作成者が削除を行う場合" do
        example "成功" do
          delete "#{COMMENT_URL}#{@current_user_comment.id}"
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(200)
        end
      end

      context "作成者以外が削除を行う場合" do
        example "失敗" do
          delete "#{COMMENT_URL}#{@other_user_comment.id}"
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(400)
        end
      end
    end
  end
end
