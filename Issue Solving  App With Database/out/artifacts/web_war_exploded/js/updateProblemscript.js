 $(document).ready(function () {


     //********************************************************************   View Problem Data   *********************************************************************//
     $("#update-problem-table tbody").empty();
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
              $("<tr>").appendTo($("#update-problem-table"))   
              .append($("<td>").text(problem.Id))
              .append($("<td>").text(problem.Name))
              .append($("<td>").text(problem.Description))
              .append($td1)
              .append($td2)
              .append($("<td>").html('<button class="updateproblem" data-id='+problem.Id+'><a href="#ex2" rel="modal:open" style="text-decoration:none;color:white;font-size:20px;">Update</a></button><br><br>'))
          })
      });






      //********************************************************************   Update Problem Listner   *********************************************************************//
      $("#update-problem-table").on('click','.updateproblem',function(){
          var actionnn="fetchusers";
          var user={     
                       action:actionnn
          };
          var jsonobject=JSON.stringify(user);
          $.get("http://localhost:8080/UsersData",{"user" : jsonobject}, function(responseJson){
              responseJson.forEach(function(user){
                  $('#mySelectt')
                  .append($("<option></option>")
                  .attr("value",user.id)
                  .text(user.name));
              })
          });
          var val=$(this).data("id");
          var action="FetchUpdateProblemData";
          var problem={      
                          action:action,
                          PProblemid:val
          };
          var jsonobject4=JSON.stringify(problem);
          $.get("http://localhost:8080/ProblemsData",{"problem" : jsonobject4}, function(responseJson){    
              responseJson.forEach(function(problem){
                  $("#problemid").val(val);
                  $("#oldproblemname").val(problem.Name);
                  $("#oldmyselectt").val(problem.ProblemHandlerId);
                  $("#oldmyselectt1").val(problem.ProblemHandler);
                  $("#problemname").val(problem.Name);
                  $("#problemdescription").val(problem.Description);
              })
          });




           //********************************************************************   Submit Updations   *********************************************************************//
           $("#submitupdatedproblemdata").on( "click", function( event ) {
               var oldProblemHandlerId=$("#oldmyselectt").val();
               var ProblemId=$("#problemid").val();
               var ProblemName=$("#problemname").val();
               var ProblemDescription=$("#problemdescription").val();
               var ProblemAssigneeuser=$('#mySelectt option:selected').text();
               var ProblemAssigneeuserId=$('#mySelectt option:selected').attr("value");
               var ProblemStatus=$('#mySelect1 option:selected').text();
               var action="submitupdatedproblemdata";
               var problem={
                               action:action,
                               PPProblemId:ProblemId,
                               ProblemName:ProblemName,
                               ProblemDescription:ProblemDescription,
                               ProblemAssigneeuser:ProblemAssigneeuser,
                               ProblemAssigneeuserId:ProblemAssigneeuserId,
                               ProblemStatus:ProblemStatus
                            };
                $("#update-problem-table tbody").empty();
                var jsonobject3=JSON.stringify(problem);
                $.get("http://localhost:8080/ProblemsData",{"problem" : jsonobject3}, function(responseJson){
                    location.href="http://localhost:8080/Update_problems.html";               
               });
               if(oldProblemHandlerId!=ProblemAssigneeuserId){
                      var action="UpdateProblemHandlerss";
                      var user4={
                                    action:action,
                                    oldProblemHandler1:oldProblemHandlerId,
                                    problem1:ProblemName
                                };
                      var jsonobject4=JSON.stringify(user4);
                      $.get("http://localhost:8080/UsersData",{"user" : jsonobject4}, function(responseJson){
                      var adduserproblem={
                                             action:"addproblemtouser",
                                             userid:ProblemAssigneeuserId,
                                             problemname:ProblemName,
                                             Problemid:ProblemId
                                          };
                      var jsonobject2=JSON.stringify(adduserproblem);
                      $.get("http://localhost:8080/UsersData",{"user" : jsonobject2}, function(responseJson){
                          console.log("user Problem Entered");
                      });   
                  });      
              }      
          });
      });
      $("#update-problem-table").on('click','.user',function(){
          var value1=$(this).data("id");
          localStorage.setItem("UserId",value1);
          window.open("http://localhost:8080/User.html");
      });
      
  });