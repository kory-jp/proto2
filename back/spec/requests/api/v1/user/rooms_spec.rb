require 'rails_helper'

RSpec.describe "Api::V1::User::Rooms", type: :request do
  describe "ルーム" do
    before do
      @current_user = create(:user)
      @other_user = create(:user)
      @room = create(:room)
      @current_user_entry = create(:entry, user: @current_user, room: @room)
      @other_user_entry = create(:entry, user: @other_user, room: @room)
      @message = create(:message, user: @current_user, room: @room)
      login(@current_user)
    end

    describe "一覧取得" do
      subject { get api_v1_user_rooms_url}
      it "id, user_id, nickname, icon, messageを含んだルーム情報を最大10件取得" do
        subject
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
      subject { get api_v1_user_room_url(@room.id)}
      it "詳細情報取得" do
        subject
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
      subject { post api_v1_user_rooms_url, params: room_params_hash}
      let(:room_params_hash) {{
        room: {
          user_id: another_user.id 
        }
      }}
      let(:another_user){create(:user)}
      context "パラメータにユーザーIDが含まれている場合" do
        it "成功" do
          subject
          expect(response).to have_http_status(:ok)
        end
      end

      context "パラメータにユーザーIDが含まれていない場合" do
        let(:room_params_hash){{
          room: {
            user_id: nil
          }
        }}
        it "失敗(値を返さない)" do
          subject
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(400)
        end
      end

      context "パラメータのIDがログインしているユーザーと同一の場合" do
        let(:room_params_hash){{
          room: {
            user_id: @current_user.id
          }
        }}
        it "失敗(値を返さない)" do
          subject
          res = JSON.parse(response.body)
          expect(res["status"]).to eq(400)
        end
      end
    end
  end
end
