$(document).ready(function () {


      $("#updatetable tbody").empty();
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
                   $("<tr>").appendTo($("#updatetable"))                     // Create HTML <tr> element, set its text content with currently iterated item and append it to the <table>.
                       .append($("<td>").text(user.id))        // Create HTML <td> element, set its text content with id of currently iterated product and append it to the <tr>.
                       .append($("<td>").text(user.name))
                       .append(problem)
                       .append($("<td>").html('<button class="updateuser" data-id='+user.id+' value='+(user.name)+'><a href="#ex1" rel="modal:open" style="text-decoration:none;color:white;font-size:20px;">Update</a></button><br><br>'))
               })
           });
           
       



$("#updatetable").on('click','.updateuser',function(){
  var val=$(this).data("id");
  var val1=$(this).attr("value");
      $("#userid").val(val);
       $("#fname").val(val1);
       $("#oldname").val(val1);
  
});

$( "#submitdataaa" ).on( "click", function( event ) {
        $("#updatetable tbody").empty();
       var name=$("#fname").val();
       var oldname=$("#oldname").val();
       var UserId=$("#userid").val();
       var action="updateuserr";
       var user={
               name1:name,
               action:action,
               userid:UserId

       };
       $("#userid").val("");
       $("#fname").val("");
       var jsonobject1=JSON.stringify(user);
   
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
                   $("<tr>").appendTo($("#updatetable"))                     // Create HTML <tr> element, set its text content with currently iterated item and append it to the <table>.
                       .append($("<td>").text(user.id))        // Create HTML <td> element, set its text content with id of currently iterated product and append it to the <tr>.
                       .append($("<td>").text(user.name))
                       .append(problem)
                       .append($("<td>").html('<button class="updateuser" data-id='+user.id+' data-id1='+user.name+'><a href="#ex1" rel="modal:open" style="text-decoration:none;color:white;font-size:20px;">Update</a></button><br><br>'))
               })

                var problem={
               name1:name,
               action:"UpdateProblemHandler",
               oldname1:oldname

       };
       var jsonobject1=JSON.stringify(problem);
               $.get("http://localhost:8080/ProblemsData",{"problem" : jsonobject1}, function(responseJson){
                alert("Update problem Handler");


               })
               })
           });
           

        $("#updatetable").on('click','.problem',function(){
          var value1=$(this).data("id");
          localStorage.setItem("ProblemName",value1);
         window.open("http://localhost:8080/Problem.html");

});


   });



