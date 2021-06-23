class User < ApplicationRecord
  has_secure_password
  has_many :posts, dependent: :destroy
  mount_uploader :image_data, ImageUploader

  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
