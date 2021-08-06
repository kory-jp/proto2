require 'rails_helper'

RSpec.describe "Api::V1::User::Notifications", type: :request do
  describe "通知" do
    NOTIFICATION_URL = "/api/v1/user/notifications/"
    before do
      @current_user = create(:user)
      @other_user = create(:user)
      @post = create(:post, user_id: @current_user.id)
      @comment = create(:comment, user_id: @other_user.id, post_id: @post.id)
      @notification = create(:notification, 
                              visitor_id: @other_user.id,
                              visited_id: @current_user.id,
                              post_id: @post.id,
                              comment_id: @comment.id,
                              action: 'comment',
                              checked: 0,
                            )
      post "/api/v1/user/login",
      params:  @current_user_session_params = {
          user: {
            email: @current_user.email,
            password: @current_user.password,
          }
        };
    end

    describe "未確認の通知確認" do
      context "未確認の通知がある場合" do
        example "trueを返す" do
          get "#{NOTIFICATION_URL}unchecked_notifications"
          res = JSON.parse(response.body)
          expect(res).to eq(true)
        end
      end

      context "通知を全て確認している場合" do
        example "falseを返す" do
          get "#{NOTIFICATION_URL}"
          get "#{NOTIFICATION_URL}unchecked_notifications"
          res = JSON.parse(response.body)
          expect(res).to eq(false)
        end
      end
    end

    describe "通知一覧取得" do
      example "成功" do
        get "#{NOTIFICATION_URL}"
        res = JSON.parse(response.body)
        expect(res["notifications"][0].keys).to eq ["id", 
                                                    "visited_id", 
                                                    "visitor_id", 
                                                    "post_id", 
                                                    "comment_id",
                                                    "room_id", 
                                                    "message_id", 
                                                    "nickname", 
                                                    "icon", 
                                                    "created_at", 
                                                    "checked", "action"
                                                  ]
        expect(res["notifications"][0]["visited_id"]).to eq(@current_user.id)
        expect(res["notifications"][0]["visitor_id"]).to eq(@other_user.id)
        expect(res["notifications"][0]["post_id"]).to eq(@post.id)
        expect(res["notifications"][0]["comment_id"]).to eq(@comment.id)
        expect(res["notifications"][0]["nickname"]).to eq(@other_user.nickname)
        expect(res["notifications"][0]["action"]).to eq('comment')
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
