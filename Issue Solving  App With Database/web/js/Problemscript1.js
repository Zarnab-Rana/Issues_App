$(document).ready(function(){
    var problemname = localStorage.getItem("ProblemName");
    $("#problem tbody").empty();
    var action="FetchSingleProblemData";
    var problem={      
                    action:action,
                    Problemname:problemname
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
            $("<tr>").appendTo($("#problem"))   
            .append($("<td>").text(problem.Id))
            .append($("<td>").text(problem.Name))
            .append($("<td>").text(problem.Description))
            .append($td1)
            .append($td2)
        })
    });
    $("#problem").on('click','.user',function(){
        var value1=$(this).data("id");
        localStorage.setItem("UserId",value1);
        window.open("http://localhost:8080/User.html");
    });
});