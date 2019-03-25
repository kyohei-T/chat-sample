$(function(){
  function buildHTML(message){
    var image = message.image.url ? message.image.url : '';
    var html =
` <div class="message">
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
