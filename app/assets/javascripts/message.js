$(function(){

  function buildHTML(message){
    var image = message.image.url ? message.image.url : '';
    var html =
` <div class="message" value="${message.id}">
    <div class="message__user">
      <p class="message__user--name">
        ${message.user_name}
      </p>
      <p class="message__user--timestamp">
        ${message.time}
      </p>
    </div>
    <p class="message__message">
      ${message.text}
    </p>
    <img width="200" src="${image}">
  </div>`
    return html;
  }

  function insertHTML(){
    var pathname =location.pathname;
    $.ajax({
      type: 'GET',
      url: pathname,
      data: { last_message_id: last_message_id},
      dataType: 'json'
    }).done(function(messages){
      if (messages.length !== 0){
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.message-list').append(html);
          $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight}, 'fast');
        })
        var max = messages.slice(-1)[0].id;
        if (last_message_id < max){
          last_message_id = max;
        }
      }
    }).fail(function(){
      // alert('通信に失敗しました');
    })
  }

  var last_message_id = 0;

  if($('.message-list').length){
    $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight }, 'fast');
    setInterval(insertHTML, 5000);
    last_message_id = $(".message:last").attr("value");
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    }).done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('#new_message')[0].reset();
      $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight}, 'fast');
    }).fail(function(){
      alert('メッセージまたは画像データを入力してください')
    })
    $('.form__box__send-btn').removeAttr('data-disable-with');
  });
});
