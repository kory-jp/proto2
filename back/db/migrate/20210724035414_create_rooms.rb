class CreateRooms < ActiveRecord::Migration[6.0]
  def up
    create_table :rooms do |t|
      t.timestamps
    end
  end

  def down
    drop_table :rooms
  end
end
