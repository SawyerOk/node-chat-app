var socket = io();

function scrollToBottom () {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight +  lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function(){
    var params = jQuery.deparam(window.location.search);
    params.room = params.room.toLowerCase();
    socket.emit('join', params, function(err){
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
   

});

socket.on('disconnect', function(){
    console.log('Disconnected from serever');
});

socket.on('updateUserList', function(users, room) {
    var ol = jQuery('<ol></ol>');

    
    var span = jQuery('<span></span>');
    span.text(room);
    jQuery('#room').html(span);
  

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
    
});

//Message from server
socket.on('newMessage', function(message){
    var template = jQuery('#message-template').html();
    var time = moment(message.createdAt).format('H:MM:ss');
    var html = Mustache.render(template, {
        text : message.text,
        from : message.from,
        createdAt : time
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blink">Here I am</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
 
    li.append(a);
    jQuery('#messages').append(li);
    
} );



jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messsageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        text : messsageTextBox.val()
    }, function(){
        messsageTextBox.val('');
    });
});


//Send location
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
});
