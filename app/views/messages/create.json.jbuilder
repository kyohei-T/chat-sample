json.text             @message.text
json.image            @message.image
json.user_id          @message.user_id
json.user_name        @message.user.name
json.group_id         @message.group_id
json.group_name       @message.group.name
json.time             @message.created_at.strftime("%Y/%m/%d %H:%M")
