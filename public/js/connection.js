const socket = io('http://localhost:4000/') 

$(document).ready(function(){
    Notification.requestPermission();

    var firstname = $('#firstname').text(),
        lastname = $('#lastname').text(),
        email = $('#email').text()

        // listen to connection
        socket.emit('logged',{firstname,lastname,email})

        
        // get list of users online

        socket.on('online', data => {
            $("div#online").empty()
            
            data.arr.forEach(function(user){
                if (user.email != email){
                    x = '<div id="sidebar-user-box" class="'+user.email+'" >'+
                '<img src="photos/user.png" />'+
                '<span id="slider-username">'+user.firstname +' '+ user.lastname+'</span></div>'
                $("div#online").append(  x  );
                }   
            })
            
        })

        socket.on('msg', data =>{
            let id = data.emailFrom
            if(!$("div[id='"+id+"']").find('.msg').length  ){
                  $("div[class='"+id+"']").click()
            }
            if ($("div[id='"+id+"']").find('.msg').text() != '') {
                $("div[id='"+id+"']").show()
            }
            $("div[id='"+id+"']").find('.feedback').empty()
            $("div[id='"+id+"']").find('.msg').append('<p class="msg-left">'+data.msg+'</p>')
            let str = $("div[id='"+id+"']").find('.msg_head').text().split(" ")
            let name = str[0]
            new Notification(name+ ' sent you a msg !')
        })

        socket.on('typing', data =>{
            let id = data.emailFrom
            let str = $("div[id='"+id+"']").find('.msg_head').text().split(" ")
            let name = str[0]
            $("div[id='"+id+"']").find('.feedback').text(name+'  is typing a msg ... ') 


        })
        socket.on('stopTyping', data =>{
            let id = data.emailFrom
            $("div[id='"+id+"']").find('.feedback').empty()
        })

        socket.on('logout', () =>{
            alert('yous have been logged from another place  !')
            window.location.href = "users/logout";
        })

        socket.on('publier', data =>{
            $(".actualite").append('<p><dd>Published by<em> <a href="#">'+data.name+'</a></p> '+data.text+" </em> </dd>")
        })
        
})

