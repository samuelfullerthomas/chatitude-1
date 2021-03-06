
(function () {

  window.Messages = {}

	Messages.Presenter = function (element) {
	  var $view = $(element)

	  $view.on('click', '.update', function(e) {
         MessageList.fetch();
	  })

	  $view.on('click', '.submit', function(e) {
	  	e.preventDefault();
        var post = $('input.enterPost').val();
        console.log(post);
        MessageList.post(post);
   
	  })

	  $view.on('click', '.signUp', function(e) {
	  	var name = prompt('Enter User Name:');
	    var password = prompt('Enter Password:');

         MessageList.signup(name, password);
	  })

	  $view.on('click', '.signIn', function(e) {
         var name = prompt('Enter User Name:');
	     var password = prompt('Enter Password:');
	     MessageList.signin(name, password);
	  })

	  this.render = function() {
	  	$('#allMessages').empty().append(
          Messages.view())
	  	$('.messageContainer').append(
	  	  MessageList.map(messageView)
	  	  )
	  }	
	  App.pubsub.on('BrianRules', this.render)
	}
	Messages.view = function () {
	  return $('<div class = "messages">').append(
         $('<h2>').text("Messages:"), 
         $('<div class="messageContainer">')
	  	)
	}
	function messageView (message) {
		return $('<div class="message" >').append(
              $('<p class="username" >').append(message.user),
              $('<p class="messageText" >').append(message.message)

			)
	}
	Messages.mount = function (element) {
		var presenter = new Messages.Presenter(element);
		MessageList.fetch();
		setInterval(MessageList.fetch, 10000);
	}


})();