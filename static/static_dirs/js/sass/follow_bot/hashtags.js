window.onload = function(){
    // x functionality when window loads

     $('#inpAddTags').keypress(function(e) {
        
        //On enter hit click and reset input
        if (e.which == '13') {
            $('#addTag').click();
            $("#inpAddTags").val("");
        }
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



}
    


