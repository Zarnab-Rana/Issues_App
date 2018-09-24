public class Users {
    private int id;
    private String name;
    private String problems;

    public Users(int id, String name,String problems) {
        this.id = id;
        this.name = name;
        this.problems=problems;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getname() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }
    public void setproblems(String problemname){
        this.problems=this.problems+problemname+",";


    }
    public void UpdateProblemHandler(String Problem){
        String oldString=this.problems;

        String newString=oldString.replace(Problem+",","");
        this.problems=newString;
    }
    public String getProblems(){
        return this.problems;
    }

}
