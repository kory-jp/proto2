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
class Post < ApplicationRecord
  mount_uploader :image, ImageUploader

  has_many :users, through: :favorites
  has_many :comments, foreign_key: :post_id, dependent: :destroy
  has_many :post_tag_relations, foreign_key: :post_id, dependent: :destroy
  has_many :tags, through: :post_tag_relations, foreign_key: :post_id, dependent: :destroy
  has_many :favorites, dependent: :delete_all
  
  belongs_to :user


  validates :title, presence: true
  validates :content, presence: true
end
