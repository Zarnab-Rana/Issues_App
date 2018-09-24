import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "ProblemsData",urlPatterns = {"/ProblemsData"})
public class ProblemsData extends HttpServlet {
    public static List<Problems> ProblemsList=new ArrayList<Problems>();
    DBConnect object;

    {
        try {
            object = new DBConnect();
            String query="SELECT * FROM problems";
            object.result=object.statement.executeQuery(query);
            while (object.result.next()){
                int id=object.result.getInt(1);
                String problemname=object.result.getString(2);
                String problemdescription=object.result.getString(3);
                String problemhandler=object.result.getString(4);
                int problemhandlerid=object.result.getInt(5);
                String problemstatus=object.result.getString(6);
                Problems newproblem=new Problems(id,problemname,problemdescription,problemhandler,problemhandlerid,problemstatus);
                ProblemsList.add(newproblem);
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
         doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject problemobject= null;
        try {
            problemobject = new JSONObject(request.getParameter("problem"));
            int problemlistsize=ProblemsList.size();
            String problemaction=(String) problemobject.get("action");
            if(problemaction.equals("view")){
                String jsonn = new Gson().toJson(ProblemsList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }
            if(problemaction.equals("checkprojectname")) {
                List<Problems> problemsList1=new ArrayList<Problems>();
                String name1 = (String) problemobject.get("name");
                double index = 0.5;
                for (int i = 0; i < problemlistsize; i++) {
                    if (ProblemsList.get(i).getname().toLowerCase().equals(name1.toLowerCase())) {
                        index = i;
                        int id=ProblemsList.get(i).getId();
                        String name=ProblemsList.get(i).getname();
                        String Description= ProblemsList.get(i).getdescription();
                        String ProblemStatus= ProblemsList.get(i).getProblemStatus();
                        String ProblemAssigneeuser= ProblemsList.get(i).getProblemHandler();
                        int ProblemAssigneeuserId=ProblemsList.get(i).getProblemHandlerId();
                        Problems problem1 = new Problems(id,name,Description,ProblemAssigneeuser,ProblemAssigneeuserId,ProblemStatus);
                        problemsList1.add(problem1);
                    }
                }
                if (index == 0.5){
                    int id=1;
                    String name="NULL";
                    String Description= "NULL";
                    String ProblemStatus= "NULL";
                    String ProblemAssigneeuser= "NULL";
                    int ProblemAssigneeuserId=1;
                    Problems problem1 = new Problems(id,name,Description,ProblemAssigneeuser,ProblemAssigneeuserId,ProblemStatus);
                    problemsList1.add(problem1);
                }
                String jsonn = new Gson().toJson(problemsList1);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }
            else
            if(problemaction.equals("submitproblem")) {
                String Name = (String) problemobject.get("ProblemName");
                String Description = (String) problemobject.get("ProblemDescription");
                String ProblemStatus = (String) problemobject.get("ProblemStatus");
                String ProblemAssigneeuser = (String) problemobject.get("ProblemAssigneeuser");
                String ProblemAssigneeuserId = (String) problemobject.get("ProblemAssigneeuserId");
                int ProblemAssigneeuserId1 = Integer.parseInt(ProblemAssigneeuserId);
                DBConnect object1=new DBConnect();
                String query="INSERT INTO problems(problemname,problemdescription,problemhandler,problemhandlerid,problemstatus) VALUES('"+Name+"','"+Description+"','"+ProblemAssigneeuser+"','"+ProblemAssigneeuserId1+"','"+ProblemStatus+"')";
                object1.statement.execute(query);
                String query1="SELECT * FROM problems WHERE problemname='"+Name+"'";
                object1.result=object1.statement.executeQuery(query1);
                while (object1.result.next()){
                    int id=object1.result.getInt(1);
                    String problemname=object1.result.getString(2);
                    String problemdescription=object1.result.getString(3);
                    String problemhandler=object1.result.getString(4);
                    int problemhandlerid=object1.result.getInt(5);
                    String problemstatus=object1.result.getString(6);
                    Problems newproblem=new Problems(id,problemname,problemdescription,problemhandler,problemhandlerid,problemstatus);
                    ProblemsList.add(newproblem);

                }
                String jsonn = new Gson().toJson(ProblemsList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);

            }
            else
            if(problemaction.equals("FetchUpdateProblemData")){
                int problemIdd= (int) problemobject.get("PProblemid");
                int index1=0;
                for (int i=0;i<problemlistsize;i++) {
                    if (ProblemsList.get(i).getId()==problemIdd){
                        index1 = i;
                    }
                }

                int id=ProblemsList.get(index1).getId();
                String name=ProblemsList.get(index1).getname();
                String Description= ProblemsList.get(index1).getdescription();
                String ProblemStatus= ProblemsList.get(index1).getProblemStatus();
                String ProblemAssigneeuser= ProblemsList.get(index1).getProblemHandler();
                int ProblemAssigneeuserId=ProblemsList.get(index1).getProblemHandlerId();
                Problems problem1 = new Problems(id,name,Description,ProblemAssigneeuser,ProblemAssigneeuserId,ProblemStatus);
                List<Problems> problemsList1=new ArrayList<Problems>();
                problemsList1.add(problem1);
                String jsonn = new Gson().toJson(problemsList1);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }
            else
            if(problemaction.equals("submitupdatedproblemdata")){
                String PPProblemIdroblemideee=(String) problemobject.get("PPProblemId");
                int PPProblemIdroblemideeee=Integer.parseInt(PPProblemIdroblemideee);
                String Name= (String) problemobject.get("ProblemName" );
                String Description= (String) problemobject.get("ProblemDescription" );
                String ProblemStatus= (String) problemobject.get("ProblemStatus" );
                String ProblemAssigneeuser= (String) problemobject.get("ProblemAssigneeuser" );
                String ProblemAssigneeuserId= (String) problemobject.get("ProblemAssigneeuserId" );
                int ProblemAssigneeuserId1=Integer.parseInt(ProblemAssigneeuserId);
                DBConnect object4=new DBConnect();
                String query4="UPDATE problems SET problemname='"+Name+"',problemdescription='"+Description+"',problemhandler='"+ProblemAssigneeuser+"',problemhandlerid='"+ProblemAssigneeuserId1+"',problemstatus='"+ProblemStatus+"'WHERE id='"+PPProblemIdroblemideeee+"'";
                object4.statement.execute(query4);
                int index2=0;
                for (int i=0;i<problemlistsize;i++) {
                    if (ProblemsList.get(i).getId()==PPProblemIdroblemideeee){
                        index2 = i;
                    }
                }

                ProblemsList.get(index2).setname(Name);
                ProblemsList.get(index2).setdescription(Description);
                ProblemsList.get(index2).setproblemstatus(ProblemStatus);
                ProblemsList.get(index2).setProblemHandler(ProblemAssigneeuser);
                ProblemsList.get(index2).setProblemHandlerId(ProblemAssigneeuserId1);
                String jsonn = new Gson().toJson(ProblemsList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);

            }
            else
            if(problemaction.equals("DeleteProblem")){
                int problemid6=(int) problemobject.get("problemid5");
                int index3=0;
                for (int i=0;i<problemlistsize;i++) {
                    if (ProblemsList.get(i).getId()==problemid6){
                        index3 = i;
                    }
                }
                DBConnect object7=new DBConnect();
                String query7="DELETE FROM problems WHERE id='"+problemid6+"'";
                object7.statement.execute(query7);
                ProblemsList.remove(index3);
                String jsonn = new Gson().toJson(ProblemsList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);


            }
            else
            if(problemaction.equals("UpdateProblemHandler")){

                String problemHandlerOldname= (String) problemobject.get("oldname1");
                String problemHandlernewname= (String) problemobject.get("name1");
                DBConnect object9=new DBConnect();
                String query9="UPDATE problems SET problemhandler='"+problemHandlernewname+"' WHERE problemhandler='"+problemHandlerOldname+"'";
                object9.statement.execute(query9);
                int index=0;
                for (int i=0;i<problemlistsize;i++) {
                    if (ProblemsList.get(i).getProblemHandler().equals(problemHandlerOldname)){
                        index = i;
                        ProblemsList.get(index).setProblemHandler(problemHandlernewname);
                    }
                }
            }
            else
            if(problemaction.equals("FetchSingleProblemData")){
                String problemname= (String) problemobject.get("Problemname");
                int index=0;
                for (int i=0;i<problemlistsize;i++) {
                    if (ProblemsList.get(i).getname().equals(problemname)){
                        index = i;
                    }
                }
                int id=ProblemsList.get(index).getId();
                String name=ProblemsList.get(index).getname();
                String Description= ProblemsList.get(index).getdescription();
                String ProblemStatus= ProblemsList.get(index).getProblemStatus();
                String ProblemAssigneeuser= ProblemsList.get(index).getProblemHandler();
                int ProblemAssigneeuserId=ProblemsList.get(index).getProblemHandlerId();
                Problems problem1 = new Problems(id,name,Description,ProblemAssigneeuser,ProblemAssigneeuserId,ProblemStatus);
                List<Problems> problemsList1=new ArrayList<Problems>();
                problemsList1.add(problem1);
                String jsonn = new Gson().toJson(problemsList1);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }

        } catch (JSONException | ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }


    }
}
