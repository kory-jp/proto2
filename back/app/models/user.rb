# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string(255)      not null
#  image_data      :text(65535)
#  introduction    :text(65535)
#  name            :string(255)      not null
#  nickname        :string(255)
#  password_digest :string(255)      not null
#  suspended       :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  mount_uploader :image_data, ImageUploader
  has_secure_password
  
  has_many :posts, foreign_key: :user_id, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
