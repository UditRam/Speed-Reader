$(function(){

    var myarray;
    var inputleng;
    var read = false;
    var counter;
    var action;
    var speed;
    $("#new").hide();
    $("#pause").hide();
    $("#resume").hide();
    //    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();
    
    //get the text and split it to words in an array

    $("#start").click(function(){

        myarray = $("#userinput").val().split(/\s+/); //+ is used to ignore mutiple spaces and \s is for spaces, tabs, newlines

        inputleng= myarray.length;

        if(inputleng>1){
            read=true;
            $("#new").show();
            $("#start").hide();
            $("#pause").show();
            //         $("#controls").show();
            $("#userinput").hide();
            $("#error").hide();


            counter =0;
            speed=200;

            $("#result").show();

            action = setInterval(reading, speed);
        }

        else{
            $("#error").show();
        }
    });
    
    //On clicking new button
    $("#new").click(function(){
        location.reload();
    });
    //On clicking pause button
    $("#pause").click(function(){
        $("#pause").hide();
        $("#resume").show();
        clearInterval(action);
    });
    //On clicking resume button
    $("#resume").click(function(){
        $("#pause").show();
        $("#resume").hide();
        read=true;
        action = setInterval(reading, speed);

    });

    //When you change the font
    $("#fontslider").on("slidestop", function(event,ui){
        $("#fontslider").slider('refresh');
        var fontval= parseInt($("#fontslider").val());

        $("#result").css("fontSize", fontval);

    });
    
//    When you change Words per min
    $("#speedslider").on("slidestop", function(event,ui){
        $("#speedslider").slider('refresh');
        var speedval= parseInt($("#speedslider").val());

        clearInterval(action);
        speed = 60000/speedval;
        if(read==true){
            action = setInterval(reading, speed);
        }
    });

    //When you click on settings button
    $("#settings").click(function(){
        $("#controls").toggle(); 
    });

    function reading(){
        if(counter == inputleng){
            clearInterval(action);
            read=false;
            $("#pause").hide();
        }
        else{
            $("#result").text(myarray[counter]);
            counter++;
        }
    }
})