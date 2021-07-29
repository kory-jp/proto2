class Api::V1::User::EntriesController < Api::V1::User::Base

  def check
    user = User.find(params[:id])
    current_user_entries = Entry.where(user_id: current_user.id)
    user_entries = Entry.where(user_id: user.id)
    unless user.id == current_user.id
      current_user_entries.each do |current_user_entry|
        user_entries.each do |user_entry|
          if current_user_entry.room_id == user_entry.room_id
            @isRoom = true
            render json: {
              entries: {
                isRoom: true,
                room_id: current_user_entry.room_id,
              }
            }
          end
        end
      end
      unless @isRoom
        render json: {
          entries: {
            isRoom: false,
          }
        }
      end
    else
      render json: {
        entries: {
          isRoom: false,
        }
      }
    end
  end

end
