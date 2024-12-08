package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SlotsRepository {
    private final JdbcTemplate jdbc;

    public SlotsRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    public List<Slot> addSlot(Slot slot) {
        String querry = "SELECT * FROM time_slots WHERE courtid = ? AND ((starttimestamp=? AND endtimestamp=?) OR (starttimestamp<? AND endtimestamp>?) OR (starttimestamp<? AND endtimestamp>?) OR (starttimestamp>? AND starttimestamp<?) OR (endtimestamp>? AND endtimestamp<?) OR (starttimestamp=? AND endtimestamp<?) OR (starttimestamp>? AND endtimestamp=?))";
        RowMapper<Slot> purchaseRowMapper = (r, i) -> {
            Slot rowObject = new Slot();
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setPrice(String.valueOf(r.getFloat("price")));
            rowObject.setStartTimestamp(r.getTimestamp("starttimestamp").toLocalDateTime());
            rowObject.setEndTimestamp(r.getTimestamp("endtimestamp").toLocalDateTime());
            rowObject.setUserId(r.getInt("userid"));
            rowObject.setTimeSlotId(r.getInt("timeslotid"));
            /*rowObject.setUserId(r.getInt("userid"));
            rowObject.setEmail(r.getString("email"));
            rowObject.setFirstName(r.getString("firstname"));
            rowObject.setLastName(r.getString("lastname"));
            rowObject.setRoleId(r.getInt("roleid"));
            rowObject.setPhoneNumber(r.getString("phonenumber"));*/
            return rowObject;
        };
        List<Slot> lista=jdbc.query(querry, purchaseRowMapper,
                slot.getCourtId(),slot.getStartTimestamp(),slot.getEndTimestamp(),
                slot.getStartTimestamp(),slot.getStartTimestamp(),
                slot.getEndTimestamp(),slot.getEndTimestamp(),
                slot.getStartTimestamp(),slot.getEndTimestamp(),
                slot.getStartTimestamp(),slot.getEndTimestamp(),
                slot.getStartTimestamp(),slot.getEndTimestamp(),
                slot.getStartTimestamp(),slot.getEndTimestamp()
        );
        if(!lista.isEmpty()){
            return lista;
        }
        else{
            querry="INSERT INTO time_slots(starttimestamp,endtimestamp,price,courtid,isBooked) VALUES(?,?,?,?,FALSE)";
            jdbc.update(querry,
                    slot.getStartTimestamp(),slot.getEndTimestamp(),Float.valueOf(slot.getPrice()),slot.getCourtId());
        }
        return null;
    }

    public void delete(int timeSlotId) {
        String querry="DELETE FROM time_slots WHERE timeslotid=?";
        jdbc.update(querry,
                timeSlotId);
    }

    public void book(int timeSlotId, int userId) {
        String querry="UPDATE time_slots SET isbooked=TRUE,userid=? WHERE timeslotid=?";
        jdbc.update(querry,userId,
                timeSlotId);
    }

    public boolean cancel(int timeSlotId) {
        String querry = "SELECT COUNT(*) FROM time_slots WHERE timeslotid = ? AND (starttimestamp::timestamp -'1 day'::INTERVAL < CURRENT_TIMESTAMP::timestamp  OR endtimestamp::timestamp -'1 day'::INTERVAL < CURRENT_TIMESTAMP::timestamp )";
        Integer number = jdbc.queryForObject(querry, Integer.class, timeSlotId);
        if(number>0){
            return false;
        }
        else{
            querry="UPDATE time_slots SET isbooked=FALSE,userid=NULL WHERE timeslotid=?";
            jdbc.update(querry,
                    timeSlotId);
        }
        return true;
    }


    public List<Slot> getO(int courtId, int userId) {
        String querry="SELECT * FROM time_slots natural join users WHERE courtid = ? and userid=?";
        RowMapper<Slot> purchaseRowMapper = (r, i) -> {
            Slot rowObject = new Slot();
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setPrice(String.valueOf(r.getFloat("price")));
            rowObject.setStartTimestamp(r.getTimestamp("starttimestamp").toLocalDateTime());
            rowObject.setEndTimestamp(r.getTimestamp("endtimestamp").toLocalDateTime());
            rowObject.setUserId(r.getInt("userid"));
            rowObject.setTimeSlotId(r.getInt("timeslotid"));
            rowObject.setBooked(r.getBoolean("isbooked"));
            return rowObject;
        };
        return jdbc.query(querry, purchaseRowMapper,courtId,userId);
    }

    public List<Slot> getP(int courtId, int userId) {
        String querry="SELECT * FROM time_slots natural join users WHERE courtid = ? and userid=?";
        RowMapper<Slot> purchaseRowMapper = (r, i) -> {
            Slot rowObject = new Slot();
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setPrice(String.valueOf(r.getFloat("price")));
            rowObject.setStartTimestamp(r.getTimestamp("starttimestamp").toLocalDateTime());
            rowObject.setEndTimestamp(r.getTimestamp("endtimestamp").toLocalDateTime());
            rowObject.setUserId(r.getInt("userid"));
            rowObject.setTimeSlotId(r.getInt("timeslotid"));
            rowObject.setBooked(r.getBoolean("isbooked"));
            return rowObject;
        };
        return jdbc.query(querry, purchaseRowMapper,courtId,userId);
    }
}
