package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CourtRepository {
    private final JdbcTemplate jdbc;

    public CourtRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void addCourt(Court court) {
        String querry="INSERT INTO courts(courtname,location,isindoor,image,userid) VALUES(?,?,?,?,?)";
        jdbc.update(querry,
                court.getCourtName(),court.getLocation(),court.getisIndoor(),court.getImage(),court.getUser().getUserId());
    }

    public List<Court> getCourts(int userId) {
        String querry="SELECT * FROM courts natural join users WHERE userid = ?";
        RowMapper<Court> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Court rowObject = new Court();
            rowObject.setUser(user);
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setImage(r.getString("image"));
            rowObject.setisIndoor(r.getBoolean("isindoor"));
            rowObject.setCourtName(r.getString("courtname"));
            rowObject.setLocation(r.getString("location"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper,userId);
    }

    public List<Court> getAllCourts() {
        String querry="SELECT * FROM courts natural join users";
        RowMapper<Court> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Court rowObject = new Court();
            rowObject.setUser(user);
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setImage(r.getString("image"));
            rowObject.setisIndoor(r.getBoolean("isindoor"));
            rowObject.setCourtName(r.getString("courtname"));
            rowObject.setLocation(r.getString("location"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper);
    }

    public Court getCourt(int courtId) {
        String querry="SELECT * FROM courts natural join users WHERE courtid = ?";
        RowMapper<Court> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Court rowObject = new Court();
            rowObject.setUser(user);
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setImage(r.getString("image"));
            rowObject.setisIndoor(r.getBoolean("isindoor"));
            rowObject.setCourtName(r.getString("courtname"));
            rowObject.setLocation(r.getString("location"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper,courtId).get(0);
    }

    public void editCourt(Court court) {
        String querry="UPDATE courts SET courtName= ?,location= ?,isIndoor= ?,image= ?,userId= ? WHERE courtid = ?";
        jdbc.update(querry,court.getCourtName(),court.getLocation(),court.getisIndoor(),court.getImage(),court.getUser().getUserId(),court.getCourtId());
    }

    public List<Court> getCourtsImageless(int userId) {
        String querry="SELECT * FROM courts natural join users WHERE userid = ?";
        RowMapper<Court> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Court rowObject = new Court();
            rowObject.setUser(user);
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setisIndoor(r.getBoolean("isindoor"));
            rowObject.setCourtName(r.getString("courtname"));
            rowObject.setLocation(r.getString("location"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper,userId);
    }

}
