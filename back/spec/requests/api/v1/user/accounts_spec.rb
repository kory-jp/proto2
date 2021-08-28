require 'rails_helper'

RSpec.describe "Api::V1::User::Accounts", type: :request do
  describe "アカウント" do
    before do
      @current_user = create(:user)
      @other_user = create(:user, password: "other_user_password")
      @following_user = create(:user)
      @post = create(:post, user: @current_user)
      login(@current_user)
    end

    describe "アカウント情報取得" do
      before do
        # 高評価記事テストデータ作成
        post api_v1_user_post_favorites_url(@post.id), params: current_user_favorite_params = {
          favorites: {
            user_id: @current_user.id,
            post_id: @post.id,
          }
        };

        post api_v1_user_relationships_url, params: current_user_following_params = {
          user_id: @following_user.id,
        };
      end
      describe "投稿記事" do
        subject { get myposts_api_v1_user_account_url(@current_user.id)}
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
        subject {get favorite_posts_api_v1_user_account_url(@current_user.id)}
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
        subject { get follows_api_v1_user_accounts_url}
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
        subject { get edit_api_v1_user_account_url(edit_account_id)}
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
        subject { patch api_v1_user_accounts_url, params: update_params_hash}
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

    describe "パスワード" do
      subject {post password_api_v1_user_accounts_path, params: password_params_hash}
      let(:password_params_hash) {{
        user: {
          previous_password: @current_user.password,
          password: "change_password",
          password_confirmation: "change_password"
        }
      }}
      context "現在のパスワード、変更後パスワード、確認用変更後パスワードが適切な場合" do
        it "変更成功" do
          subject
          res = JSON.parse(response.body)
          expect(res["id"]).to eq(@current_user.id)
          expect(User.find(@current_user.id).authenticate("change_password")).to be_truthy
          expect(response).to have_http_status(:ok)
        end
      end

      context "入力された現在のパスワードが間違っている場合" do
        let(:password_params_hash) {{
          user: {
            previous_password: @other_user.password
          }
        }}
        it "変更失敗" do
          subject
          res = JSON.parse(response.body)
          expect(res["message"]).to eq("現在のパスワードに誤りがあります")
          expect(User.find(@current_user.id).authenticate("change_password")).to be_falsy
        end
      end

      context "変更後パスワードと確認用変更後パスワードが一致しない場合" do
        let(:password_params_hash) {{
          user: {
            previous_password: @current_user.password,
            password: "change_password",
            password_confirmation: "not_change_password"
          }
        }}
        it "変更失敗" do
          subject
          res = JSON.parse(response.body)
          expect(res["message"]).to eq("入力されたパスワードと確認用パスワードが一致しません")
          expect(User.find(@current_user.id).authenticate("change_password")).to be_falsy
        end
      end
    end

    describe "アカウント削除" do
      subject { post api_v1_user_accounts_url, params: current_user_delete_params_hash}
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
