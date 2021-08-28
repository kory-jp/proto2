require 'rails_helper'

RSpec.describe "Api::V1::User::Messages", type: :request do
  describe "メッセージ" do
    before do
      @current_user = create(:user)
      @other_user = create(:user)
      @room = create(:room)
      @current_user_entry = create(:entry, user: @current_user, room: @room)
      @other_user_entry = create(:entry, user: @other_user, room: @room)
      login(@current_user)
    end

    describe "メッセージ保存" do
      subject { post api_v1_user_messages_url, params: message_params_hash}
      let(:message_params_hash) {{
        message: {
          user_id: @current_user.id,
          room_id: @room.id,
          content: "テストメッセージ",
        }
      }}
      context "パラメータに必須項目(user_id, room_idとcontentかimageいずれか)が含まれている場合" do
        it  "保存成功(更新されたルーム情報を受け取る)" do
          subject
          res = JSON.parse(response.body)
          expect(res["room"].keys).to eq ["id", "messages", "users"]
          expect(res["room"]["id"]).to eq(@room.id)
          expect(res["room"]["messages"][0]["user_id"]).to eq(@current_user.id)
          expect(res["room"]["messages"][0]["room_id"]).to eq(@room.id)
          expect(res["room"]["messages"][0]["content"]).to eq("テストメッセージ")
          expect(response).to have_http_status(:ok)
        end
      end
  
      context "パラメータの必須項目にnullが含まれる場合" do
        let(:message_params_hash) {{
          message: {
            content: nil
          }
        }}
        it  "保存失敗(値を返さない)" do
          subject
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(400)
        end
      end
    end
  end
end
