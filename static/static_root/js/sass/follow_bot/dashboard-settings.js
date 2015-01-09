
$(function() {
    
    initSwitches();
    ajaxSetup();
    hide('#stopBot');
    var startAppRequest;
    
    
    $("a").tooltip({'placement': 'left','content':'html'});
    
    $("#confirmUser").click(function(){
        
        //Clear user search history
        $('#userBody').empty();
    });
    
    $('#inpAddTags').keypress(function(e) {
        
        //On enter hit click and reset input
        if (e.which == '13') {
            $('#addTag').click();
            $("#inpAddTags").val("");
        }
    });
    
    $(".dropdown-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.btn-group').find('#followBy').html(selText);
        if (selText == 'Hashtags') {
            $("#hashtagsWrapper").show();
            $("#usernamesWrapper").hide();
        } else {
            $("#hashtagsWrapper").hide();
            $("#usernamesWrapper").show();
        }
    });
    
    $("#startBot").click(function(event) {
        
        event.preventDefault();
        appSettings = getAppSettings();
        startApp(appSettings);
        //poll_user_status();
    });
    
    $("#stopBot").click(function(event) {
        alert("outer stopping");
       
    });
    
    // Submit post on submit
    $('#post-form').on('submit', function(event){
        event.preventDefault();
    });


});

    function stopApp() {

        alert("stopping!");
        
        $.ajax({
            url : "/stop_app/", // the endpoint
            type : "GET", // http method
            // handle a successful response
            success : function(result) {
                alert(result);
            },
    
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        
        });
        

     }
    
    function poll_user_status() {

        $.ajax({
            url : "poll_status/", // the endpoint
            type : "GET", // http method
            datatype: 'json',
            // handle a successful response
            success : function(status_results) {
                num_followed = status_results['new_followed'];
                $("#num-following").html(num_followed);
                $("#num-favorites").html(num_followed);
                setTimeout(poll_user_status,1200000);     //Poll every 120 seconds
            },
    
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        
        });
        

     }
     
     function startApp(appSettings) {

        
        resetNums();
        
        $("#start-stop-label").html("Started");
        $("#start-stop-label").addClass("status-started");
        
        startAppRequest = $.ajax({
            url : "/start_app/", // the endpoint
            type : "POST", // http method
            data : { 'settings' : JSON.stringify(appSettings) }, // data sent with the post request
            
            
            success : function(gained_followers) {
            },
    
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        
        });
        
        hide('#startBot');
        show('#stopBot');
        
     }
     
   
     
     function hide(id) {
        $(id).hide();
     }
     
     function show(id) {
        $(id).show();
     }
    
     function getAppSettings() {
            
            var users = [];
            var tags = [];
             
            $(".unit-username").each(function () {
                 users.push($(this).attr("data-username"));
            });
            
            
            $(".unit-tag").each(function () {
                 tags.push($(this).attr("data-tag"));
            });
            
             var autoFollowCheckbox = document.querySelector('#auto-follow');
             var autoRetweetCheckbox = document.querySelector('#auto-retweet');
             var autoFavoriteCheckbox = document.querySelector('#auto-favorite');
             var autoUnfollowCheckbox = document.querySelector('#auto-unfollow');
             
             var appSettings = {
                 
                     "users" : users,
                     "tags"  : tags,
                     "autoFollow" : autoFollowCheckbox.checked,
                     "autoRetweet" : autoRetweetCheckbox.checked,
                     "autoFavorite" : autoFavoriteCheckbox.checked,
                     "autoUnfollow" : autoUnfollowCheckbox.checked
                     
             };
            
            return appSettings;
    }
    
    function initSwitches() {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

        elems.forEach(function(html) {
          var switchery = new Switchery(html);
        });
    }
    
    function ajaxSetup() {
        
        $.ajaxSetup({ 
            beforeSend: function(xhr, settings) {
                function getCookie(name) {
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
                }
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    // Only send the token to relative URLs i.e. locally.
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            } 
       });
    }
    
    function resetNums() {
        
        $("#num-following").html("0");
        $("#num-retweets").html("0");
        $("#num-favorites").html("0");
        $("#num-unfollows").html("0");
        $("#new-follower").html("0");
        $("#new-retweet").html("0");
        $("#new-favorite").html("0");
    }
