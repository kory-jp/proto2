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

  # has_many :users, through: :favorites
  has_many :users, through: :favorites
  has_many :comments, foreign_key: :post_id, dependent: :destroy
  has_many :post_tag_relations, foreign_key: :post_id, dependent: :destroy
  has_many :tags, through: :post_tag_relations, foreign_key: :post_id, dependent: :destroy
  has_many :favorites, dependent: :delete_all
  has_many :notifications, dependent: :destroy
  
  belongs_to :user


  validates :title, presence: true
  validates :content, presence: true

  def create_notification_favorite!(current_user)
    temp = Notification.where(["visitor_id = ? and visited_id = ? and post_id = ? and action = ?", current_user.id, user_id, id, 'favorite'])
    if temp.blank?
      if current_user.id != user_id
        notification = current_user.active_notifications.new(
          post_id: id,
          visited_id: user_id,
          action: 'favorite'
        )
        if notification.visitor_id == notification.visited_id
          notification.checked = true
        end
        notification.save if notification.valid?
      end
    end
  end

  def create_notification_comment!(current_user, comment_id)
    temp_ids = Comment.select(:user_id).where(post_id: id).where.not(user_id: current_user.id).distinct
    temp_ids.each do |temp_id|
      save_notification_comment!(current_user, comment_id, temp_id['user_id'])
    end
    save_notification_comment!(current_user, comment_id, user_id) if temp_ids.blank?
  end

  def save_notification_comment!(current_user, comment_id, visited_id)
    if current_user.id != visited_id
      notification = current_user.active_notifications.new(
        post_id: id,
        comment_id: comment_id,
        visited_id: visited_id,
        action: 'comment'
      )
      if notification.visitor_id == notification.visited_id
        notification.checked = true
      end
      notification.save if notification.valid?
    end
  end
end
