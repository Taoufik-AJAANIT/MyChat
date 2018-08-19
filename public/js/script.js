$(document).ready(function(){
     
	 var arr = []; // List of users	
	
	$(document).on('click', '.msg_head', function() {	
		var chatbox = $(this).parents().attr("id") ;
		$('[id="'+chatbox+'"] .msg_wrap').slideToggle('fast');
		return false;
	});

	$(document).on('click', '.close', function() {	
		var chatbox = $(this).parents().parents().attr("id") ;
		$('[id="'+chatbox+'"]').hide();
		arr.splice($.inArray(chatbox, arr), 1);
		displayChatBox();
		return false; 
	}); 
	
	$(document).on('click', '#sidebar-user-box', function() {
	
	 var userID = $(this).attr("class");
	 var username = $(this).children().text() ;
	 
	 if ($.inArray(userID, arr) != -1)
	 {
      arr.splice($.inArray(userID, arr), 1);
	 }

	 arr.unshift(userID);
	 chatPopup =  '<div class="msg_box" style="right:270px" id="'+ userID+'">'+
					'<div class="msg_head">'+username +
					'<div class="close">x</div> </div>'+
					'<div class="msg_wrap"> <div class="msg_body"><div class="msg"></div><p class="feedback"></p></div> '+
					'<div class="msg_footer"><textarea class="msg_input" rows="4"></textarea></div></div></div>' ;					
				
     $("body").append(  chatPopup  );
	 displayChatBox();
	});
	
	
	$(document).on('keypress', 'textarea' ,function(e) {    
		var emailTo = $(this).parents().parents().parents().attr("id") ;
		var emailFrom = $('#email').text()
		socket.emit('typing',{emailTo,emailFrom})
        if (e.keyCode == 13 ) { 		
            var msg = $(this).val();		
			$(this).val('');
			// save data to send here 
			
			socket.emit('msg',{emailTo,emailFrom,msg})
			// add msg to window
			if(msg.trim().length != 0){				
			$("div[id='"+emailTo+"']").find('.msg').append('<p class="msg-right">'+msg+'</p>')
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			}
        }
	});
	
	// stop typing 
	$(document).on('focusout', 'textarea' ,function (e)  {    
		var emailTo = $(this).parents().parents().parents().attr("id") ;
		var emailFrom = $('#email').text()
		socket.emit('stopTyping',{emailTo,emailFrom})
	});

	// vu xD

	// $(document).on('focusin', 'textarea' ,function (e)  {    
	// 	var emailTo = $(this).parents().parents().parents().attr("id") ;
	// 	var emailFrom = $('#email').text()
	// 	socket.emit('seen',{emailTo,emailFrom})
	// });

	// publication : 
	$(document).on('submit', 'form' ,function (e)  {   
		e.preventDefault();
		var text = $('#text').val()
		if (text)
		{
			var name = $('#firstname').text()+' '+$('#lastname').text()
		
			socket.emit('publier',{text,name})
			$('#text').val('')
		}
		
	}); 


    
	function displayChatBox(){ 
	    i = 270 ; // start position
		j = 260;  //next position
		
		$.each( arr, function( index, value ) {  
		   if(index < 4){
	         $('[id="'+value+'"]').css("right",i);
			 $('[id="'+value+'"]').show();
		     i = i+j;			 
		   }
		   else{
			 $('[id="'+value+'"]').hide();
		   }
        });		
	}
	
	
	
	
});