package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbc;

    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    public void storeUser(User user){
        String querry="INSERT INTO users(email,firstName,lastName,roleId) VALUES(?,NULL,NULL,NULL)";
        jdbc.update(querry,
                user.getEmail());
    }
    public boolean userExist(String email){
        String querry="SELECT COUNT(*) FROM users WHERE email = ?";
        Integer number = jdbc.queryForObject(querry,Integer.class,email);
        return (number==1) ? true:false;
    }
    public User getUser(String email){
        String querry="SELECT * FROM users WHERE email = ?";
        RowMapper<User> purchaseRowMapper = (r, i) -> {
            User rowObject = new User();
            rowObject.setUserId(r.getInt("userid"));
            rowObject.setEmail(r.getString("email"));
            rowObject.setFirstName(r.getString("firstname"));
            rowObject.setLastName(r.getString("lastname"));
            rowObject.setRoleId(r.getInt("roleid"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper,email).get(0);
    }
    public void updateUser(User user){
        String querry = "UPDATE users SET firstname = ?, lastname = ?, roleid=? WHERE userid = ?";
        jdbc.update(querry, user.getFirstName(), user.getLastName(), user.getRoleId(),user.getUserId());
        if(user.getRoleId()==2){
            querry ="INSERT INTO players(userid) VALUES(?)";
            jdbc.update(querry,user.getUserId());
        }
        else if(user.getRoleId()==4){
            querry ="INSERT INTO owners(userid,phonenumber) VALUES(?,?)";
            jdbc.update(querry,user.getUserId(),user.getPhoneNumber());
        }
    }

    public User getOwner(int userId) {
        String querry="SELECT * FROM users natural left join owners WHERE userid = ?";
        RowMapper<User> purchaseRowMapper = (r, i) -> {
            User rowObject = new User();
            rowObject.setUserId(r.getInt("userid"));
            rowObject.setEmail(r.getString("email"));
            rowObject.setFirstName(r.getString("firstname"));
            rowObject.setLastName(r.getString("lastname"));
            rowObject.setRoleId(r.getInt("roleid"));
            rowObject.setPhoneNumber(r.getString("phonenumber"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper,userId).get(0);
    }

    public void updateOwner(User user) {
        String querry = "UPDATE users SET firstname = ?, lastname = ? WHERE userid = ?";
        jdbc.update(querry, user.getFirstName(), user.getLastName(),user.getUserId());
        querry = "UPDATE owners SET phonenumber=? WHERE userid = ?";
        jdbc.update(querry, user.getPhoneNumber(),user.getUserId());
    }

    public List<User> getAllUsers() {
        String querry="SELECT * FROM users natural left join owners";
        RowMapper<User> purchaseRowMapper = (r, i) -> {
            User rowObject = new User();
            rowObject.setUserId(r.getInt("userid"));
            rowObject.setEmail(r.getString("email"));
            rowObject.setFirstName(r.getString("firstname"));
            rowObject.setLastName(r.getString("lastname"));
            rowObject.setRoleId(r.getInt("roleid"));
            rowObject.setPhoneNumber(r.getString("phonenumber"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper);

    }

    public void addUser(User user) {
        String querry="INSERT INTO users(email,firstName,lastName,roleId) VALUES(?,?,?,?)";
        jdbc.update(querry,
                user.getEmail(),user.getFirstName(),user.getLastName(),user.getRoleId());

        querry="SELECT userid FROM users where email=?";
        RowMapper<Integer> purchaseRowMapper = (r, i) -> {
            return r.getInt("userid");
        };
        int userId=jdbc.query(querry, purchaseRowMapper,user.getEmail()).get(0);
        if(user.getRoleId()==2){
            querry ="INSERT INTO players(userid) VALUES(?)";
            jdbc.update(querry,userId);
        }
        else if(user.getRoleId()==4){
            querry ="INSERT INTO owners(userid,phonenumber) VALUES(?,?)";
            jdbc.update(querry,userId,user.getPhoneNumber());
        }
    }
}
