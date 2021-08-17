require 'rails_helper'

RSpec.describe "Api::V1::User::Messages", type: :request do
  describe "メッセージ" do
    MESSAGE_URL = "/api/v1/user/messages/"
    before do
      @current_user = create(:user)
      @other_user = create(:user)
      @room = create(:room)
      @current_user_entry = create(:entry, user: @current_user, room: @room)
      @other_user_entry = create(:entry, user: @other_user, room: @room)
      post "/api/v1/user/login",
      params:  @current_user_session_params = {
          user: {
            email: @current_user.email,
            password: @current_user.password,
          }
        };
    end

    context "パラメータに必須項目(user_id, room_idとcontentかimageいずれか)が含まれている場合" do
      example "保存成功(更新されたルーム情報を受け取る)" do
        post "#{MESSAGE_URL}",
        params: message_params_hash = {
          message: {
            user_id: @current_user.id,
            room_id: @room.id,
            content: "テストメッセージ",
          }
        }
        res = JSON.parse(response.body)
        expect(res["room"].keys).to eq ["id", "messages", "users", "page_length"]
        expect(res["room"]["id"]).to eq(@room.id)
        expect(res["room"]["messages"][0]["user_id"]).to eq(@current_user.id)
        expect(res["room"]["messages"][0]["room_id"]).to eq(@room.id)
        expect(res["room"]["messages"][0]["content"]).to eq("テストメッセージ")
        expect(response).to have_http_status(:ok)
      end
    end

    context "パラメータの必須項目にnullが含まれる場合" do
      example "保存失敗(値を返さない)" do
        post "#{MESSAGE_URL}",
        params: message_params_hash = {
          message: {
            user_id: @current_user.id,
            room_id: @room.id,
          }
        }
        res = JSON.parse(response.body)
        expect(res["status"]).to eq(400)
      end
    end
  end
end
