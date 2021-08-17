class Api::V1::User::EntriesController < Api::V1::User::Base

  def check
    user = User.find(params[:id])
    current_user_entries = Entry.where(user_id: current_user.id)
    user_entries = Entry.where(user_id: user.id)
    unless user.id == current_user.id
      current_user_entries.each do |current_user_entry|
        user_entries.each do |user_entry|
          if current_user_entry.room_id == user_entry.room_id
            @is_room = true
            render json: {
              entries: {
                is_room: true,
                room_id: current_user_entry.room_id,
              }
            }
          end
        end
      end
      unless @is_room
        render json: {
          entries: {
            is_room: false,
          }
        }
      end
    else
      render json: {
        entries: {
          is_room: false,
        }
      }
    end
  end

end
