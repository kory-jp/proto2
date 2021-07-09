class CreateRelationships < ActiveRecord::Migration[6.0]
  def up
    create_table :relationships do |t|
      t.integer :following_id
      t.integer :follower_id

      t.timestamps
    end
  end

  def down
    drop_table :relationships
  end
end
