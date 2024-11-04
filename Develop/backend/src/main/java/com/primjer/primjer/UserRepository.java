package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

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
            rowObject.setRoleId(r.getInt("lastname"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper).get(0);
    }
}
