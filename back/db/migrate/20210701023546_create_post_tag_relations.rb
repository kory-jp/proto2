class CreatePostTagRelations < ActiveRecord::Migration[6.0]
  def up
    create_table :post_tag_relations do |t|
      t.references :post, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :post_tag_relations
  end
end
