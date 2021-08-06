# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string(255)      not null
#  image           :string(255)
#  introduction    :text(65535)
#  name            :string(255)      not null
#  nickname        :string(255)
#  password_digest :string(255)      not null
#  suspended       :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe User, type: :model do
  describe "ユーザー" do
    describe "新規登録" do
      context "氏名、ニックネーム、メールアドレス、パスワードが有効な場合" do
        example "成功" do
          user = build(:user)
          expect(user).to be_valid
        end
      end

      context "氏名がnilの場合" do
        example "失敗" do
          user = build(:user, name: nil)
          user.valid?
          expect(user.errors[:name]).to include("を入力してください")
        end
      end

      context "メールアドレスがnilの場合" do
        example "失敗" do
          user = build(:user, email: nil)
          user.valid?
          expect(user.errors[:email]).to include("を入力してください")
        end
      end

      context "メールアドレスが重複している場合" do
        example "失敗" do
          user = create(:user)
          other_user = build(:user, email: user.email)
          other_user.valid?
          expect(other_user.errors[:email]).to include("はすでに存在します")
        end
      end
    end
  end
end
