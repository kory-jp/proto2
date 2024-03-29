class CreateUsers < ActiveRecord::Migration[6.0]
  def up
    create_table :users do |t|
      t.string :email, null: false
      t.string :name, null: false
      t.string :nickname
      t.string :password_digest, null: false
      t.boolean :suspended, null: false, default: false
      t.text :introduction
      t.string :image

      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
