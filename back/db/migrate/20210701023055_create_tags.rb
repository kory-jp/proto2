class CreateTags < ActiveRecord::Migration[6.0]
  def up
    create_table :tags do |t|
      t.string :value, null: false
      t.string :label, null: false

      t.timestamps
    end
  end

  def down
    drop_table :tags
  end
end
