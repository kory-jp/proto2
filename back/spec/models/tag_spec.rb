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
require 'rails_helper'

RSpec.describe Tag, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
end
