$(document).ready(function () {

    //**********************************************************  View User Script  *********************************************************************************//
    $("#table tbody").empty();
    var action="view";
    var user={
        action:action
    };
    var jsonobject=JSON.stringify(user);
    $.get("http://localhost:8080/UsersData",{"user" : jsonobject}, function(responseJson){

        responseJson.forEach(function(user){
            var problem="";
            var problemss=new Array();
            problem=user.problems;
            problemss=problem.split(',');
            if(user.problems==""){
                problem = $('<td>').text("No Problems");
            }
            else
            if(user.problems!=""){
                var length=problemss.length;
                var Allproblems="";
                for(i=0;i<length-1;i++){
                    if(i==0){
                        Allproblems=Allproblems+'<a href="" class="problem" data-id='+problemss[i]+' style="color:tomato;text-decoration: none; border-bottom: 2px solid white;cursor:pointer;">'+problemss[i]+'</a>'
                    }
                    else
                        Allproblems=Allproblems+',<a href="" class="problem" data-id='+problemss[i]+' style="color:tomato;text-decoration: none; border-bottom: 2px solid white;cursor:pointer;">'+problemss[i]+'</a>'
                }
                problem = $('<td>').html(Allproblems);
            }
            $("<tr>").appendTo($("#table"))
                .append($("<td>").text(user.id))
                .append($("<td>").text(user.name))
                .append(problem)
        })
    });

       //**********************************************************  Add User Script  *********************************************************************************//
       $( "#submitdata" ).on( "click", function( event ) {
           var name=$("#fname").val();
           var action="checkusername";
           var user={
               name:name,
               action:action
           };
           var jsonobject=JSON.stringify(user);
           $.get("http://localhost:8080/UsersData",{"user" : jsonobject}, function(responseJson){
               responseJson.forEach(function(user){
                   if(user.name=="NULL"){
                       var name=$("#fname").val();
                       var action="submit";
                       var user1={
                       name:name,
                       action:action
                       };
                       var jsonobject1=JSON.stringify(user1);
                       $("#table tbody").empty();
                       $.get("http://localhost:8080/UsersData",{"user" : jsonobject1}, function(responseJson){
                           responseJson.forEach(function(user){
                               var problem="";
                               var problemss=new Array();
                               problem=user.problems;
                               problemss=problem.split(',');
                               if(user.problems==""){
                                   problem = $('<td>').text("No Problems");
                               }
                               else
                               if(user.problems!=""){
                                   var length=problemss.length;
                                   var Allproblems="";
                                   for(i=0;i<length-1;i++){
                                       if(i==0){
                                           Allproblems=Allproblems+'<a href="" class="problem" data-id='+problemss[i]+' style="color:tomato;text-decoration: none; border-bottom: 2px solid white;cursor:pointer;">'+problemss[i]+'</a>'
                                       }
                                       else
                                           Allproblems=Allproblems+',<a href="" class="problem" data-id='+problemss[i]+' style="color:tomato;text-decoration: none; border-bottom: 2px solid white;cursor:pointer;">'+problemss[i]+'</a>'
                                   }
                                   problem = $('<td>').html(Allproblems);
                               }
                               $("<tr>").appendTo($("#table"))
                                   .append($("<td>").text(user.id))
                                   .append($("<td>").text(user.name))
                                   .append(problem)
                           })
                          
                        });
                    }
                    else
                        if(user.name!="NULL"){
                            alert("This User already exists");
                        }
                    })
                });
           });
       $("#table").on('click','.problem',function(){
          var value1=$(this).data("id");
          localStorage.setItem("ProblemName",value1);
         window.open("http://localhost:8080/Problem.html");

});
          
        });