class CreateComments < ActiveRecord::Migration[6.0]
  def up
    create_table :comments do |t|
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :comment, null: false

      t.timestamps
    end
  end

  def down
    drop_table :comments
  end
end
