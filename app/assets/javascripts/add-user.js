$(function(){

  var member_ids = new Array();
  var search_list = $("#user-search-result")
  var group_member = $("#added-chat-group-user")
  var notMatch = -1;

  $(document).ready(function(){
    $(".chat-group-user input").each(function(){
      member_ids.push( $(this).attr("value") );
    });
  })

  function appendUser(user){
    var html =
`   <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div>${ msg }</div>`
    search_list.append(html);
  }

  function removeUser(id, name){
    var html =
`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
  <input name='group[user_ids][]' type='hidden' value='${id}'>
  <p class='chat-group-user__name'>${name}</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>`
    group_member.append(html)
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    if(!input){
      $("#user-search-result").empty();
      return false;
    }
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    }).done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          if($.inArray(user.id.toString(), member_ids)== notMatch){
            appendUser(user);
          }
        });
      }else{
        appendErrMsgToHTML("一致する名前がありません");
      }
    }).fail(function(){
      alert('ユーザ検索に失敗しました');
    })
  });

  $("#user-search-result").on("click",".chat-group-user__btn--add", function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    member_ids.push( id );
    $(this).parent(".chat-group-user").remove();
    removeUser(id,name);
  });

  $("#chat-group-users").on("click",".chat-group-user__btn--remove", function(e){
    e.preventDefault();
    id = $(this).children('input').attr("value");
    member_ids.splice($.inArray(id,member_ids), 1);
    $(this).parent(".chat-group-user").remove();
  })
});
