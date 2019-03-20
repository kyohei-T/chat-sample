class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true

  def show_last_message
    if (first_message = messages.first).present?
      first_message.text? ? first_message.text : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
