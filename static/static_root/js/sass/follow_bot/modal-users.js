$(function() {
    
    
    $('#user').keypress(function(e) {
        
        //On enter hit click and reset input
        if (e.which == '13') {
            $('#searchUsers').click();
        }
    });
    
    $("#searchUsers").click(function() {
        
        var user = $("#user").val();
        
        $('.users-muted').addClass("status-started");
        
        $.get('/search_users/', {user: user}, function(data){
              
              var userName = data['search_result'];
              var photoUrl = data['photo_url'];
                
              $('.users-muted').removeClass("status-started");

          
               //We didn't find a user on Twitter!
               if (typeof userName === 'undefined') {
                
                    alert("Sorry, no match!");          
                    
               } else {
                       
                var matchedUser = '<span class="unit-username unit-username-select" data-username="' +  userName + '" data-id="1454959905">'+
                                         '<span>' + userName + '</span>'+
                                            '<img src=" ' + photoUrl +  '" class="unit-username-avatar">'+
                                            '<span class="unit-username-chk">'+
                                                '<input id="' + userName + '" class="chk-custom" type="checkbox">'+
                                                '<label for="username-1454959905" class="chk-custom"></label>'+
                                            '</span>'+
                                     '</span>'
                    
                                     
                $('#userBody').append( matchedUser);
               }
              
           });
    });
 

  $(document).on("change", "input[class='chk-custom']", function () {
            
        $("#addUser").hide();
     
         $("input[class='chk-custom']:checked").each(function () {
            $("#addUser").show();
        });
         
         
        
    });
    
    $("#addUser").click(function() {
            
       
        $('input:checked[class="chk-custom"]').each(function () {
            
            var user = $(this).attr("id");
    
            
            var newUser = '<span class="unit-username" data-username="' + user + '">'+
                             '<span>' + user  + '</span>' +
                             '<a href="#" class="delete" tabindex="-1">x</a>' + 
                          '</span>';
              
                     
            $("#usernames").append(newUser);
            
        
        });
        
        $('#myModal').modal('toggle');
        $("#userBody").empty();
        $("#addUser").hide();

      
        
    });


    $('#addTag').click(function() {
       
       
       var tag = $('#inpAddTags').val();
        
       var newTag = '<span class="unit-tag" data-tag="' + tag  + '" data-id="278913968">'+
                        '<span>'  +  tag +  '</span>' + 
                        '<a href="#" class="delete" tabindex="-1">x</a>' +
                    '</span>';
            
        $('#tagBody').append(newTag);
    });
    
     $(document).on("click", ".delete", function(e) {
        
        e.preventDefault();
        
        
        $(this).parent().remove();
        
    });

});