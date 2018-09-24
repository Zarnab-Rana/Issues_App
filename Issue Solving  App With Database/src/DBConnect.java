import java.sql.*;

public class DBConnect {
    public Connection connection;
    public Statement statement;
    public ResultSet result;

    public DBConnect() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/issues","root","");
        statement=connection.createStatement();
    }
}
