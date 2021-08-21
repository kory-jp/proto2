class Api::V1::User::NotificationsController < Api::V1::User::Base

  def unchecked_notifications
    notifications = current_user.passive_notifications.where(checked: false)
    if notifications.any?
      render json: true
    else
      render json: false
    end
  end

  # 通知は最大10件抽出させ、その中で未確認が含まれている場合は確認済みに変更してから、抽出分をフロントエンドへAPI通信を実行する
  def index
    @notifications = Notification.eager_load(:visitor).where(visited_id:current_user.id).page(params[:page] ||=1).per(10)
    Notification.where(id: @notifications.reject{|n| n.checked}.map{|n| n.id}).update_all(checked: true)
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
