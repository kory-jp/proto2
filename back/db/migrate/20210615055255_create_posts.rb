class CreatePosts < ActiveRecord::Migration[6.0]
  def up
    create_table :posts do |t|
      t.references :user, foreign_key: true
      t.string :title, null: false
      t.text :content, null: false
      t.string :image

      t.timestamps
    end
  end

  def down
    drop_table :posts
  end
end
