# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  comment    :text(65535)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_comments_on_post_id  (post_id)
#  index_comments_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (post_id => posts.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "コメント" do
    describe "新規投稿" do
      before do
        @user = create(:user)
        @post = create(:post, user: @user)
      end

      context "コメント本文を入力した場合" do
        example "成功" do
          comment = build(:comment, user_id: @user.id, post_id: @post.id)
          expect(comment).to be_valid
        end
      end

      context "コメント本文が未入力の場合" do
        example "失敗" do
          comment = build(:comment, user_id: @user.id, post_id: @post.id, comment: nil)
          comment.valid?
          expect(comment.errors[:comment]).to include("を入力してください")
        end
      end
    end
  end
end
