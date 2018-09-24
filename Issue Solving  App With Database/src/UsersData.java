import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


import org.json.JSONException;
import org.json.JSONObject;
import com.google.gson.*;
@WebServlet(name = "UsersData",urlPatterns = {"/UsersData"})
public class UsersData extends HttpServlet {
    public static List<Users> UserList=new ArrayList<Users>();
    DBConnect object;

    {
        try {
            object = new DBConnect();
            String query="SELECT * FROM users";
            object.result=object.statement.executeQuery(query);
            while (object.result.next()){
                int id=object.result.getInt(1);
                String name=object.result.getString(2);
                String problems=object.result.getString(3);
                Users user1 = new Users(id, name,problems);
                UserList.add(user1);


            }
        }  catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            JSONObject jsonObject = new JSONObject(request.getParameter("user"));
            int size=UserList.size();

            String action= (String) jsonObject.get("action" );



            if (action.equals("view")){
                String json1 = new Gson().toJson(UserList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json1);

            }
            else
            if(action.equals("checkusername")) {
                List<Users> userList1 = new ArrayList<Users>();
                String name1 = (String) jsonObject.get("name");
                double index = 0.5;
                for (int i = 0; i < size; i++) {
                    if (UserList.get(i).getname().toLowerCase().equals(name1.toLowerCase())) {
                        index = i;
                        int idd1 = UserList.get(i).getId();
                        String name = UserList.get(i).getname();
                        String problem = UserList.get(i).getProblems();
                        Users user1 = new Users(idd1, name, problem);
                        userList1.add(user1);
                    }
                }
                if (index == 0.5){
                    int idd1 = 1;
                    String name = "NULL";
                    String problem ="";
                    Users user1 = new Users(idd1, name, problem);
                    userList1.add(user1);
                }
                String jsonn = new Gson().toJson(userList1);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }
            else
            if(action.equals("submit")) {
                String namee= (String) jsonObject.get("name" );
                String problem="";
                String query="insert into users(username,problems)values('"+namee+"','"+problem+"')";
                try {
                    DBConnect object1=new DBConnect();
                    object1.statement.execute(query);

                        String queryy="SELECT * from users where username='"+namee+"'";
                        object1.result=object1.statement.executeQuery(queryy);
                        while (object1.result.next()) {
                            int id1 = object1.result.getInt(1);
                            String name1 = object1.result.getString(2);
                            String problems1 = object1.result.getString(3);
                            Users user = new Users(id1, name1, problems1);
                            UserList.add(user);
                            String json1 = new Gson().toJson(UserList);
                            response.setContentType("application/json");
                            response.setCharacterEncoding("UTF-8");
                            response.getWriter().write(json1);
                        }

                } catch (SQLException | ClassNotFoundException e) {
                    e.printStackTrace();
                }



            }
            else
            if(action.equals("fetchusers")){
                String json11 = new Gson().toJson(UserList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json11);
            }
            else
            if(action.equals("addproblemtouser")) {

                String Id = (String) jsonObject.get("userid");
                String prroblem = (String) jsonObject.get("problemname");

                int result = Integer.parseInt(Id);
                int index=0;

                for (int i=0;i<size;i++) {
                    if (UserList.get(i).getId() == result) {
                        index = i;
                    }
                }
                DBConnect object2=new DBConnect();
                String userproblems="";
                String query2="SELECT * FROM users WHERE id='"+Id+"'";
                object2.result=object2.statement.executeQuery(query2);
                while (object2.result.next()){
                    userproblems=object2.result.getString(3);
                    userproblems=userproblems+prroblem+",";

                }
                String query3="UPDATE users SET problems='"+userproblems+"' WHERE id='"+Id+"'";
                object2.statement.execute(query3);
                UserList.get(index).setproblems(prroblem);
                String json1 = new Gson().toJson(UserList);
            }
            if(action.equals("UpdateProblemHandlerss")){
                String updateidd=(String) jsonObject.get("oldProblemHandler1");
                String ProblemName=(String) jsonObject.get("problem1");
                int idd=Integer.parseInt(updateidd);
                String userproblems="";
                DBConnect object5=new DBConnect();
                String query5="SELECT * FROM users WHERE id='"+idd+"'";
                object5.result=object5.statement.executeQuery(query5);
                while (object5.result.next()){
                    userproblems=object5.result.getString(3);
                }
                String oldproblems=userproblems;
                String newproblems=oldproblems.replace(ProblemName+",","");
                DBConnect object6=new DBConnect();
                String query6="UPDATE users SET problems='"+newproblems+"' WHERE id='"+idd+"'";
                object6.statement.execute(query6);
                int indexx=0;
                for (int i=0;i<size;i++) {
                    if (UserList.get(i).getId()==idd){
                        indexx = i;
                    }

                }
                UserList.get(indexx).UpdateProblemHandler(ProblemName);

            }
            else
            if(action.equals("UpdateProblemHandlersss")){
                int idd=(int) jsonObject.get("oldProblemHandler1");
                String ProblemName=(String) jsonObject.get("problem1");
                String userproblems="";
                DBConnect object5=new DBConnect();
                String query5="SELECT * FROM users WHERE id='"+idd+"'";
                object5.result=object5.statement.executeQuery(query5);
                while (object5.result.next()){
                    userproblems=object5.result.getString(3);
                }
                String oldproblems=userproblems;
                String newproblems=oldproblems.replace(ProblemName+",","");
                DBConnect object6=new DBConnect();
                String query6="UPDATE users SET problems='"+newproblems+"' WHERE id='"+idd+"'";
                object6.statement.execute(query6);

                int indexxx=0;
                for (int i=0;i<size;i++) {
                    if (UserList.get(i).getId()==idd){
                        indexxx = i;
                    }

                }
                UserList.get(indexxx).UpdateProblemHandler(ProblemName);

            }
            else
            if(action.equals("updateuserr")){
                String idd= (String) jsonObject.get("userid");
                String name= (String) jsonObject.get("name1");
                int iddd=Integer.parseInt(idd);
                DBConnect object8=new DBConnect();
                String query8="UPDATE users SET username='"+name+"' WHERE id='"+iddd+"'";
                object8.statement.execute(query8);

                int index=0;
                for (int i=0;i<size;i++) {
                    if (UserList.get(i).getId()==iddd){
                        index = i;
                    }
                }
                UserList.get(index).setname(name);
                String json11 = new Gson().toJson(UserList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(json11);


            }
            else
            if(action.equals("CheckuserProblems")){
                int idd= (int) jsonObject.get("Userid");
                //int iddd=Integer.parseInt(idd);
                int index=0;
                for (int i=0;i<size;i++) {
                    if (UserList.get(i).getId()==idd){
                        index = i;
                    }
                }
                int idd1=UserList.get(index).getId();
                String name=UserList.get(index).getname();
                String problem= UserList.get(index).getProblems();
                Users user1 = new Users(idd1, name,problem);
                List<Users> userList1=new ArrayList<Users>();
                userList1.add(user1);
                String jsonn = new Gson().toJson(userList1);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }
            else
            if(action.equals("Deleteuser")){
                int idd= (int) jsonObject.get("Userid");
                int index=0;
                DBConnect object10=new DBConnect();
                String query10="DELETE FROM users WHERE id='"+idd+"'";
                object10.statement.execute(query10);
                for (int i=0;i<size;i++) {
                    if (UserList.get(i).getId()==idd){
                        index = i;
                    }
                }
                UserList.remove(index);
                String jsonn = new Gson().toJson(UserList);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }
            else
            if(action.equals("FetchSingleUserData")){
                String idd= (String) jsonObject.get("Userid");
                int iddd=Integer.parseInt(idd);
                int index=0;
                for (int i=0;i<size;i++) {
                    if (UserList.get(i).getId()==iddd){
                        index = i;
                    }
                }
                int idd1=UserList.get(index).getId();
                String name=UserList.get(index).getname();
                String problem= UserList.get(index).getProblems();
                Users user1 = new Users(idd1, name,problem);
                List<Users> userList1=new ArrayList<Users>();
                userList1.add(user1);
                String jsonn = new Gson().toJson(userList1);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonn);
            }

        } catch (JSONException | ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }


    }
}
