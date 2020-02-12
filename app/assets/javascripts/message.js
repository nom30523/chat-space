$(function(){
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message">
                    <div class="message__upper">
                      <p class="message__upper__user-name">${message.user_name}</p>
                      <p class="message__upper__date">${message.created_at}</p>
                    </div>
                    <p class="message__text">${message.body}</p>
                    <image src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="message">
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
});