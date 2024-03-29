# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  label      :string(255)      not null
#  value      :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
  has_many :post_tag_relations, foreign_key: :tag_id, dependent: :destroy
  has_many :posts, through: :post_tag_relations, foreign_key: :tag_id, dependent: :destroy
end
