class CreateMessages < ActiveRecord::Migration[6.0]
  def up
    create_table :messages do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.text :content
      t.string :image

      t.timestamps
    end
  end

  def down
    drop_table :messages
  end
end
