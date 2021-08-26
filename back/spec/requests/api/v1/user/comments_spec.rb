require 'rails_helper'

RSpec.describe "Api::V1::User::Comments", type: :request do
  describe "コメント" do
    POST_COMMNETS_URL = "/api/v1/user/posts/"
    COMMENT_URL = "/api/v1/user/comments/"
    before do
      @current_user = create(:user)
      @post = create(:post, user: @current_user)
      @current_user_comment = create(:comment, user_id: @current_user.id, post_id: @post.id)
      create_list(:comment, 11, user_id: @current_user.id, post_id: @post.id)
      @other_user = create(:user)
      @other_user_comment = create(:comment, user_id: @other_user.id, post_id: @post.id)
      login(@current_user)
    end

    describe "コメント取得" do
      subject { get "#{POST_COMMNETS_URL}#{@post.id}/comments" }
      example "コメントを最大10件所得" do
        subject
        res = JSON.parse(response.body)
        expect(res["comments"].length).to eq 10
        expect(res["comments"][0].keys).to eq ["id", "post_id", "user_id", "nickname", "icon", "comment", "created_at"]
        expect(response).to have_http_status(:ok)
      end
    end

    describe "コメント新規投稿" do
      subject { post "#{POST_COMMNETS_URL}#{@post.id}/comments", params: @comment_params_hash}
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
          subject
          res = JSON.parse(response.body)
          expect(res["post_id"]).to eq(@post.id)
          expect(res["user_id"]).to eq(@current_user.id)
          expect(res["comments"]).to eq("テストコメント")
          expect(response).to have_http_status(:ok)
        end
      end

      context "必須項目が未入力の場合" do
        example "失敗(データを受け取れない)" do
          @comment_params_hash = {
            comment: {
              comment: ""
            }
          }
          subject
          res = JSON.parse(response.body)
          expect(res["message"]).to eq("入力項目に誤りがあります")
        end
      end
    end

    describe "コメント編集" do
      subject { patch "#{COMMENT_URL}#{edit_comment_id}", params: @edit_comment_params_hash}
      before do
        @edit_comment_params_hash = {
          comment: {
            comment: "テストコメント更新"
          }
        }
      end
      context "作成者が編集を行う場合" do
        let(:edit_comment_id) {@current_user_comment.id}
        example "成功(更新データを受け取れる)" do
          subject
          res = JSON.parse(response.body)
          expect(res["post_id"]).to eq(@post.id)
          expect(res["user_id"]).to eq(@current_user.id)
          expect(res["comments"]).to eq("テストコメント更新")
          expect(response).to have_http_status(:ok)
        end
      end

      context "作成者でないユーザーが編集を行う場合" do
        let(:edit_comment_id) {@other_user_comment.id}
        example "失敗(データを受け取れない)" do
          subject
          res = JSON.parse(response.body)
          expect(res["message"]).to eq("編集権限がありません")
        end
      end
    end

    describe "コメント削除" do
      subject { delete "#{COMMENT_URL}#{delete_comment_id}"}
      context "作成者が削除を行う場合" do
        let(:delete_comment_id) {@current_user_comment.id}
        example "成功" do
          subject
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(200)
        end
      end

      context "作成者以外が削除を行う場合" do
        let(:delete_comment_id) { @other_user_comment.id}
        example "失敗" do
          subject
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(400)
        end
      end
    end
  end
end
