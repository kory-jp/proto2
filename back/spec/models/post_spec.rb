# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  content    :text(65535)      not null
#  image      :string(255)
#  title      :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Post, type: :model do
  describe "投稿" do
    describe "新規投稿" do
      before do
        @user = create(:user)
      end
      context "タイトルと本文が入力されている場合" do
        example "成功" do
          post = build(:post, user_id: @user.id)
          expect(post).to be_valid
        end
      end

      context "タイトルが未入力の場合" do
        example "失敗" do
          post = build(:post, user_id: @user.id, title: nil)
          post.valid?
          expect(post.errors[:title]).to include("を入力してください")
        end
      end

      context "本文が未入力の場合" do
        example "失敗" do
          post = build(:post, user_id: @user.id, content: nil)
          post.valid?
          expect(post.errors[:content]).to include("を入力してください")
        end
      end
    end
  end
end
