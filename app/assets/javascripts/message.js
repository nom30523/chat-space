$(function(){

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    var url = 'api/messages';
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    })
  }

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message" data-message-id='${message.id}'>
                    <div class="message__upper">
                      <p class="message__upper__user-name">${message.user_name}</p>
                      <p class="message__upper__date">${message.created_at}</p>
                    </div>
                    <p class="message__text">${message.body}</p>
                    <image src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__upper">
                      <p class="message__upper__user-name">${message.user_name}</p>
                      <p class="message__upper__date">${message.created_at}</p>
                    </div>
                    <p class="message__text">${message.body}</p>
                  </div>`
      return html;
    }
  }

  $('#new_message').on('submit', function(e) {
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
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージを入力してください");
      $('.send-btn').prop('disabled', false);
    })
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});