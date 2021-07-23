# == Schema Information
#
# Table name: post_tag_relations
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :bigint           not null
#  tag_id     :bigint           not null
#
# Indexes
#
#  index_post_tag_relations_on_post_id  (post_id)
#  index_post_tag_relations_on_tag_id   (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (post_id => posts.id)
#  fk_rails_...  (tag_id => tags.id)
#
require 'rails_helper'

RSpec.describe PostTagRelation, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
end
