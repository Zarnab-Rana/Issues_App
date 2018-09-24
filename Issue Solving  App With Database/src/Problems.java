public class Problems {
    private int Id;
    private int ProblemHandlerId;
    private String Name;
    private String Description;
    private String ProblemHandler;
    private String ProblemStatus;

    public Problems(int id,String name,String description,String problemHandler,int problemHandlerId,String problemStatus){
        this.Id=id;
        this.Name=name;
        this.Description=description;
        this.ProblemHandler=problemHandler;
        this.ProblemStatus=problemStatus;
        this.ProblemHandlerId=problemHandlerId;

    }
    public int getId() {
        return Id;
    }

    public void setId(int id) {
        this.Id = id;
    }

    public String getname() {
        return Name;
    }

    public void setname(String name) {
        this.Name = name;
    }
    public void setProblemHandler(String problemHandler) {
        this.ProblemHandler =problemHandler ;
    }

    public String getProblemHandler() {
        return ProblemHandler;
    }

    public void setdescription(String description) {
        this.Description = description;
    }
    public String getdescription() {
        return Description;
    }

    public void setproblemstatus(String ProblemStatus) {
        this.ProblemStatus =ProblemStatus ;
    }
    public String getProblemStatus() {
        return ProblemStatus;
    }
    public int getProblemHandlerId() {
        return ProblemHandlerId;
    }

    public void setProblemHandlerId(int ProblemHandlerId ) {
        this.ProblemHandlerId = ProblemHandlerId;
    }
}
