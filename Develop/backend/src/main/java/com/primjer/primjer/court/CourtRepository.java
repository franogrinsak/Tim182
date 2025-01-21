package com.primjer.primjer.court;

import com.primjer.primjer.user.User;
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

    public int addCourt(Court court) {
        String querry = "SELECT COUNT(*) FROM courts WHERE courtname= ? ";
        Integer number = jdbc.queryForObject(querry, Integer.class, court.getCourtName());
        if(number>0){
            return 0;
        }
        querry="INSERT INTO courts(courtname,location,isindoor,image,userid) VALUES(?,?,?,?,?)";
        jdbc.update(querry,
                court.getCourtName(),court.getLocation(),court.getisIndoor(),court.getImage(),court.getUser().getUserId());
        return 1;
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

    public int editCourt(Court court) {
        String querry = "SELECT COUNT(*) FROM courts WHERE courtname= ? AND courtId <> ?";
        Integer number = jdbc.queryForObject(querry, Integer.class, court.getCourtName(), court.getCourtId());
        if(number>0){
            return 0;
        }

        querry="UPDATE courts SET courtName= ?,location= ?,isIndoor= ?,image= ?,userId= ? WHERE courtid = ?";
        jdbc.update(querry,court.getCourtName(),court.getLocation(),court.getisIndoor(),court.getImage(),court.getUser().getUserId(),court.getCourtId());

        return 1;
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

    public Court getCourtByName(String teren1) {
        String querry="SELECT * FROM courts natural join users WHERE courtname = ?";
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

        return jdbc.query(querry, purchaseRowMapper,teren1).get(0);
    }
}
