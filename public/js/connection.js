const socket = io('http://localhost:4000/') 

$(document).ready(function(){
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
                '<span id="slider-username">'+user.firstname + user.lastname+'</span></div>'
                $("div#online").append(  x  );
                }   
            })
            
        })

        socket.on('msg', data =>{
            let id = data.emailFrom
            if(!$("div[id='"+id+"']").find('.msg_body').length){
                  $("div[class='"+id+"']").click()
            }
            $("div[id='"+id+"']").find('.feedback').empty()
            $("div[id='"+id+"']").find('.msg').append('<p class="msg-left">'+data.msg+'</p>')
        })

        socket.on('typing', data =>{
            // $("div[id='"+id+"']").find('.feedback').empty()
            let id = data.emailFrom
            let name = $("div[id='"+id+"']").find('.msg_head').text()
            $("div[id='"+id+"']").find('.feedback').text(name+'is typing a msg ') 


        })
})

