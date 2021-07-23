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
  # pending "add some examples to (or delete) #{__FILE__}"
end
