package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbc;

    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    public void storeUser(User user){
        String querry="INSERT INTO users VALUES(NULL,?,NULL,NULL,NULL)";
        jdbc.update(querry,
                user.getEmail());
    }
    public boolean userExist(String email){
        String querry="SELECT COUNT(*) FROM users WHERE email = ?";
        Integer number = jdbc.queryForObject(querry,Integer.class,email);
        return (number==1) ? true:false;
    }
}
