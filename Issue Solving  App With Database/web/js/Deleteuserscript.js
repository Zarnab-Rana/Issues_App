 $(document).ready(function () {
     $("#delete-user-table tbody").empty();
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
              $("<tr>").appendTo($("#delete-user-table"))                     // Create HTML <tr> element, set its text content with currently iterated item and append it to the <table>.
              .append($("<td>").text(user.id))        // Create HTML <td> element, set its text content with id of currently iterated product and append it to the <tr>.
              .append($("<td>").text(user.name))
              .append(problem)
              .append($("<td>").html('<button class="deleteuser" data-id='+user.id+' style="background-color:#C0392B;">Delete</button><br><br>'))
          })
      });
     $("#delete-user-table").on('click','.deleteuser',function(){
         var userid=$(this).data("id");
         var action="CheckuserProblems";
         var user={
                  action:action,
                  Userid:userid
         };
         var jsonobject=JSON.stringify(user);
         $.get("http://localhost:8080/UsersData",{"user" : jsonobject}, function(responseJson){
             responseJson.forEach(function(user){
                 if(user.problems==""){
                     var action="Deleteuser"; 
                     var user={
                              action:action,
                              Userid:userid
                      };
                     var jsonobject=JSON.stringify(user);
                     $.get("http://localhost:8080/UsersData",{"user" : jsonobject}, function(responseJson){
                         alert("User Deleted");
                         $("#delete-user-table tbody").empty();
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
                             $("<tr>").appendTo($("#delete-user-table"))                     
                             .append($("<td>").text(user.id))      
                             .append($("<td>").text(user.name))
                             .append(problem)
                             .append($("<td>").html('<button class="deleteuser" data-id='+user.id+' style="background-color:#C0392B;">Delete</button><br><br>'))
                        })
                    });
                }
                else
                   {
                   alert("Some Problems are assigned to this user.You cannot delete it.");
                   }

            })
        });
    });
     $("#delete-user-table").on('click','.problem',function(){
          var value1=$(this).data("id");
          localStorage.setItem("ProblemName",value1);
         window.open("http://localhost:8080/Problem.html");

});
});