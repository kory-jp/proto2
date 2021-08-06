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
    notifications = current_user.passive_notifications.page(params[:page] ||=1).per(10)
    page_length = notifications.page(1).per(10).total_pages
    notifications.where(checked: false).each do |notification|
      notification.update_attributes(checked: true)
    end
    notificationsArray = []
    notifications.each do |notification|
      notificationObj = {}
      notificationObj["id"] = notification.id
      notificationObj["post_id"] = notification.post_id
      notificationObj["visited_id"] = notification.visited_id
      notificationObj["visitor_id"] = notification.visitor_id
      notificationObj["room_id"] = notification.room_id
      notificationObj["message_id"] = notification.message_id
      user = User.find_by(id: notification.visitor_id)
      notificationObj["nickname"] = user.nickname
      notificationObj["icon"] = user.image
      notificationObj["created_at"] = notification.created_at.strftime('%Y/%m/%d %H:%M')
      notificationObj["checked"] = notification.checked      
      notificationObj["action"] = notification.action   
      notificationsArray.push(notificationObj)
    end
    data = {
      notifications: notificationsArray,
      page_length: page_length,
    }
    render json: data
  end

  def destroy
    notification = Notification.find(params[:id])
    notification.destroy

    notifications = current_user.passive_notifications.page(params[:page] ||=1).per(10)
    page_length = notifications.page(1).per(10).total_pages
    notificationsArray = []
    notifications.each do |notification|
      notificationObj = {}
      notificationObj["id"] = notification.id
      notificationObj["post_id"] = notification.post_id
      notificationObj["visited_id"] = notification.visited_id
      notificationObj["visitor_id"] = notification.visitor_id
      notificationObj["room_id"] = notification.room_id
      notificationObj["message_id"] = notification.message_id
      user = User.find_by(id: notification.visitor_id)
      notificationObj["nickname"] = user.nickname
      notificationObj["icon"] = user.image
      notificationObj["created_at"] = notification.created_at.strftime('%Y/%m/%d %H:%M')
      notificationObj["checked"] = notification.checked      
      notificationObj["action"] = notification.action   
      notificationsArray.push(notificationObj)
    end
    data = {
      notifications: notificationsArray,
      page_length: page_length,
    }
    render json: data
  end

  def destroy_all
    notifications = Notification.where(visited_id: current_user.id)
    notifications.destroy_all
  end
end
