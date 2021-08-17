class Api::V1::User::NotificationsController < Api::V1::User::Base

  def unchecked_notifications
    notifications = current_user.passive_notifications.where(checked: false)
    if notifications.any?
      render json: true
    else
      render json: false
    end
  end

  def index
    @notifications = current_user.passive_notifications.page(params[:page] ||=1).per(10)
    @notifications.where(checked: false).each do |notification|
      notification.update(checked: true)
    end
    render 'index', handlers: 'jbuilder'
  end

  def destroy
    notification = Notification.find(params[:id])
    notification.destroy

    @notifications = current_user.passive_notifications.page(params[:page] ||=1).per(10)
    render 'index', handlers: 'jbuilder'
  end

  def destroy_all
    notifications = Notification.where(visited_id: current_user.id)
    notifications.destroy_all
  end
end
