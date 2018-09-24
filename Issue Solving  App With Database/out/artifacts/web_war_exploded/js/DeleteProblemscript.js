$(document).ready(function () {
    $("#delete-problem-table tbody").empty();
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
            $("<tr>").appendTo($("#delete-problem-table"))
                .append($("<td>").text(problem.Id))
                .append($("<td>").text(problem.Name))
                .append($("<td>").text(problem.Description))
                .append($td1)
                .append($td2)
                .append($("<td>").html('<button class="deleteproblem" data-id='+problem.Id+' data-id1='+problem.ProblemHandlerId+' data-id2="'+problem.Name+'" style="background-color:#C0392B;">Delete</button><br><br>'))
        })
    });
    $("#delete-problem-table").on('click','.deleteproblem',function(){
        var problemid=$(this).data("id");
        var problemhandler=$(this).data("id1");
        var ProblemName=$(this).data("id2");
        var action1="UpdateProblemHandlersss";
        var user4={
            action:action1,
            oldProblemHandler1:problemhandler,
            problem1:ProblemName
        };
        var jsonobject4=JSON.stringify(user4);
        $.get("http://localhost:8080/UsersData",{"user" : jsonobject4}, function(responseJson){
        });
        var action="DeleteProblem";
        var problem={
            action:action,
            problemid5:problemid
        };
        var jsonobject3=JSON.stringify(problem);
        $("#delete-problem-table tbody").empty();
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
                $("<tr>").appendTo($("#delete-problem-table"))
                    .append($("<td>").text(problem.Id))
                    .append($("<td>").text(problem.Name))
                    .append($("<td>").text(problem.Description))
                    .append($td1)
                    .append($td2)
                    .append($("<td>").html('<button class="deleteproblem" data-id='+problem.Id+' data-id1='+problem.ProblemHandlerId+' data-id2="'+problem.Name+'" style="background-color:#C0392B;">Delete</button><br><br>'))
            })
        });
    });
    $("#delete-problem-table").on('click','.user',function(){
        var value1=$(this).data("id");
        localStorage.setItem("UserId",value1);
        window.open("http://localhost:8080/User.html");
    });
});




