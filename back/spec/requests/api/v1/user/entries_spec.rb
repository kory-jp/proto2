require 'rails_helper'

RSpec.describe "Api::V1::User::Entries", type: :request do
  describe "Entry POST /check" do
    ENTRY_URL = "/api/v1/user/entries/"
    before do
      @current_user = create(:user)
      @other_user = create(:user)

      post "/api/v1/user/login",
      params:  @current_user_session_params = {
          user: {
            email: @current_user.email,
            password: @current_user.password,
          }
        };
    end

    describe "既存ルームを確認" do
      before do
        @room = create(:room)
        @current_user_entry = create(:entry, user: @current_user, room_id: @room.id)
        @other_user_entry = create(:entry, user: @other_user, room_id: @room.id)
      end
      context "既存のルームが存在する場合, ルームが存在するユーザー間の場合(@current_user,@oter_user)" do
        example "{isRoom: true}とRoom_idを受け取る" do
          post "#{ENTRY_URL}/check",
          params: entries_params_hash = {
            id: @other_user.id
          } 
          res = JSON.parse(response.body)
          expect(res["entries"]["is_room"]).to eq(true)
          expect(res["entries"]["room_id"]).to eq(@room.id)
          expect(response).to have_http_status(:ok)
        end
      end

      context "既存のルームが存在しない場合(@current_userと@another_user)" do
        before do
          @another_user = create(:user)
        end
        example "{isRoom: false}を受け取る" do
          post "#{ENTRY_URL}/check",
          params: entries_params_hash = {
            id: @another_user.id
          } 
          res = JSON.parse(response.body)
          expect(res["entries"]["is_room"]).to eq(false)
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end
end
