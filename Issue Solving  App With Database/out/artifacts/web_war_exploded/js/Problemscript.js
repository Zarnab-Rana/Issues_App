   $(document).ready(function () {



       $("#problem-table tbody").empty();
       var action="view";
       var problem={
               
               action:action

       };

       var jsonobject3=JSON.stringify(problem);
           $.get("http://localhost:8080/ProblemsData",{"problem" : jsonobject3}, function(responseJson){
               responseJson.forEach(function(problem){
                   if(problem.ProblemStatus=="Entered"){
                       var $td2 = $('<td>').html('<button class="button enter">'+problem.ProblemStatus+'</button>');
                   }
                   else
                    if(problem.ProblemStatus=="Working"){
                       var $td2 = $('<td>').html('<button class="button working">'+problem.ProblemStatus+'</button>');
                   }
                   else
                    if(problem.ProblemStatus=="Finished"){
                       var $td2 = $('<td>').html('<button class="button complete">'+problem.ProblemStatus+'</button>');
                   }
                var $td1 = $('<td>').html('<a href="" class="user" data-id='+problem.ProblemHandlerId+' style="color:tomato;text-decoration: none; border-bottom: 2px solid white;cursor:pointer;">'+problem.ProblemHandler+'</a>');
                   $("<tr>").appendTo($("#problem-table"))   
                       .append($("<td>").text(problem.Id))
                       .append($("<td>").text(problem.Name))
                       .append($("<td>").text(problem.Description))
                       .append($td1)
                       .append($td2)

               })
           });


       var actionnn="fetchusers";
       var user={
               
               action:actionnn

       };

           var jsonobject=JSON.stringify(user);
           $.get("http://localhost:8080/UsersData",{"user" : jsonobject}, function(responseJson){
               responseJson.forEach(function(user){
              
                  $('#mySelect')
         .append($("<option></option>")
         .attr("value",user.id)
         .text(user.name));

               })
           });
           
       
 $( "#submitproblemdata" ).on( "click", function( event ) {
        
      
        if($('#mySelect').val()==null){
          alert("Problem Cant be Entered.First You maust add some user to assign Problem");
        }
        else
        {

       var ProblemName=$("#problemname").val();
       var action="checkprojectname";
       var problem1={
               name:ProblemName,
               action:action

       };
       var jsonobject=JSON.stringify(problem1);
           $.get("http://localhost:8080/ProblemsData",{"problem" : jsonobject}, function(responseJson){
               responseJson.forEach(function(problem){
                if(problem.Name=="NULL"){
                  var ProblemName=$("#problemname").val();
          var ProblemDescription=$("#problemdescription").val();
          var ProblemAssigneeuser=$('#mySelect option:selected').text();
          var ProblemAssigneeuserId=$('#mySelect option:selected').attr("value");
          var ProblemStatus="Entered";
          var action=$("#action").val();
          var problem={

            action:action,
            ProblemName:ProblemName,
            ProblemDescription:ProblemDescription,
            ProblemAssigneeuser:ProblemAssigneeuser,
            ProblemAssigneeuserId:ProblemAssigneeuserId,
            ProblemStatus:ProblemStatus
          };
         
           var jsonobject1=JSON.stringify(problem);
           var problemid;
           
           $.get("http://localhost:8080/ProblemsData",{"problem" : jsonobject1}, function(responseJson){
            $("#problem-table tbody").empty();
               responseJson.forEach(function(problem){
                problemid=problem.Id;
                   var $td1 = $('<td>').html('<a href="" class="user" data-id='+problem.ProblemHandlerId+' style="color:tomato;text-decoration: none; border-bottom: 2px solid white;cursor:pointer;">'+problem.ProblemHandler+'</a>');
                     if(problem.ProblemStatus=="Entered"){
                       var $td2 = $('<td>').html('<button class="button enter">'+problem.ProblemStatus+'</button>');
                   }
                   else
                    if(problem.ProblemStatus=="Working"){
                       var $td2 = $('<td>').html('<button class="button working">'+problem.ProblemStatus+'</button>');
                   }
                   else
                    if(problem.ProblemStatus=="Finished"){
                       var $td2 = $('<td>').html('<button class="button complete">'+problem.ProblemStatus+'</button>');
                   }
                   $("<tr>").appendTo($("#problem-table"))
                       .append($("<td>").text(problem.Id))
                       .append($("<td>").text(problem.Name))
                       .append($("<td>").text(problem.Description))
                       .append($td1)
                       .append($td2)
               })
                var adduserproblem={

            action:"addproblemtouser",
            userid:ProblemAssigneeuserId,
            problemname:ProblemName,
            Problemid:problemid

          };

          var jsonobject2=JSON.stringify(adduserproblem);
$.get("http://localhost:8080/UsersData",{"user" : jsonobject2}, function(responseJson){
  console.log("user Problem Entered");

  });
             });
                   
      
                }
                else
                  if(problem.Name!="NULL"){
                  alert("This Problem already exists");
                  
                }
                  

               })
                
           });
          
          }
       });



 $("#problem-table").on('click','.user',function(){
          var value1=$(this).data("id");
          localStorage.setItem("UserId",value1);
         window.open("http://localhost:8080/User.html");






});


   });




