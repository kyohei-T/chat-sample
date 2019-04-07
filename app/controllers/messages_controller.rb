class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    respond_to do |format|
      format.html do
        @messages = @group.messages.includes(:user)
      end
      format.json do
        @messages = Message.where('id > ? and user_id != ? and group_id = ?', params[:last_message_id].to_s, current_user.id, @group.id).includes(:user)
      end
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
      end
    else
      respond_to do |format|
        format.html do
          @messages = @group.messages.includes(:user)
          flash.now[:alert] = 'メッセージを入力してください'
          render :index
        end
        format.json
      end
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
