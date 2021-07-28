class CreateEntries < ActiveRecord::Migration[6.0]
  def up
    create_table :entries do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :entries
  end
end
