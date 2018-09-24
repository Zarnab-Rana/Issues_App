$(document).ready(function(){
    var useridd = localStorage.getItem("UserId");
    $("#usertable tbody").empty();
    var action="FetchSingleUserData";
    var user={
        action:action,
        Userid:useridd
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
            $("<tr>").appendTo($("#usertable"))
                .append($("<td>").text(user.id))
                .append($("<td>").text(user.name))
                .append(problem)
        })
    });
    $("#usertable").on('click','.problem',function(){
        var value1=$(this).data("id");
        localStorage.setItem("ProblemName",value1);
        window.open("http://localhost:8080/Problem.html");
    });
});