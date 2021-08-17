require 'rails_helper'

RSpec.describe "Api::V1::User::Rooms", type: :request do
  describe "ルーム" do
    ROOM_URL = "/api/v1/user/rooms/"
    before do
      @current_user = create(:user)
      @other_user = create(:user)
      @room = create(:room)
      @current_user_entry = create(:entry, user: @current_user, room: @room)
      @other_user_entry = create(:entry, user: @other_user, room: @room)
      @message = create(:message, user: @current_user, room: @room)
      post "/api/v1/user/login",
      params:  @current_user_session_params = {
          user: {
            email: @current_user.email,
            password: @current_user.password,
          }
        };
    end

    describe "一覧取得" do
      example "id, user_id, nickname, icon, messageを含んだルーム情報を最大10件取得" do
        get "#{ROOM_URL}"
        res = JSON.parse(response.body)
        expect(res["rooms"].length).to eq 1
        expect(res["rooms"][0].keys).to eq ["id", "user_id", "nickname", "icon", "message", "created_at"]
        expect(res["rooms"][0]["id"]).to eq(@room.id)
        expect(res["rooms"][0]["user_id"]).to eq(@other_user.id)
        expect(res["rooms"][0]["message"]).to eq(@message.content)
        expect(response).to have_http_status(:ok)
      end
    end

    describe "詳細表示" do
      example "詳細情報取得" do
        get "#{ROOM_URL}#{@room.id}"
        res = JSON.parse(response.body)
        expect(res["room"].keys).to eq ["id", "messages", "users"]
        expect(res["room"]["id"]).to eq(@room.id)
        expect(res["room"]["messages"][0]["id"]).to eq(@message.id)
        expect(res["room"]["messages"][0]["user_id"]).to eq(@message.user_id)
        expect(res["room"]["messages"][0]["room_id"]).to eq(@message.room_id)
        expect(res["room"]["users"][0]["id"]).to eq(@current_user.id)
        expect(res["room"]["users"][1]["id"]).to eq(@other_user.id)
        expect(response).to have_http_status(:ok)
      end
    end

    describe "新規ルーム作成" do
      before do
        @another_user = create(:user)
      end
      context "パラメータにユーザーIDが含まれている場合" do
        example "成功" do
          post "/api/v1/user/rooms",
          params: room_params_hash = {
            room: {
              user_id: @another_user.id 
            }
          }
          expect(response).to have_http_status(:ok)
        end
      end

      context "パラメータにユーザーIDが含まれていない場合" do
        example "失敗(値を返さない)" do
          post "/api/v1/user/rooms",
          params: room_params_hash = {
            room: {
              user_id: ""
            }
          }
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(400)
        end
      end

      context "パラメータのIDがログインしているユーザーと同一の場合" do
        example "失敗(値を返さない)" do
          post "/api/v1/user/rooms",
          params: room_params_hash = {
            room: {
              user_id: @current_user.id
            }
          }
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(400)
        end
      end
    end
  end
end
