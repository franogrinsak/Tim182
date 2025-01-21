package com.primjer.primjer.slot;

import com.primjer.primjer.slot.Slot;
import com.primjer.primjer.user.User;
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
            querry="INSERT INTO time_slots(starttimestamp,endtimestamp,price,courtid) VALUES(?,?,?,?)";
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
    public String getPrice(int timeSlotId) {
        String query = "SELECT price FROM time_slots WHERE timeslotid = ?";
        return jdbc.queryForObject(
                query,
                String.class,
                timeSlotId
        );
    }
    public Integer getInt(int timeSlotId) {
        String query = "SELECT courtid FROM time_slots WHERE timeslotid = ?";
        return jdbc.queryForObject(
                query,
                Integer.class,
                timeSlotId
        );
    }

    public void book(int timeSlotId, int userId) {
        String querry="UPDATE time_slots SET userid = ? WHERE timeslotid=?";
        jdbc.update(querry,userId,
                timeSlotId);
    }

    public void cancel(int timeSlotId) {
        /*String querry = "SELECT COUNT(*) FROM time_slots WHERE timeslotid = ? AND (starttimestamp::timestamp -'1 day'::INTERVAL < CURRENT_TIMESTAMP::timestamp  OR endtimestamp::timestamp -'1 day'::INTERVAL < CURRENT_TIMESTAMP::timestamp )";*/
        String querry = "SELECT COUNT(*) FROM time_slots WHERE timeslotid = ? AND (starttimestamp - INTERVAL '1' DAY < CURRENT_TIMESTAMP OR endtimestamp - INTERVAL '1' DAY < CURRENT_TIMESTAMP)";
        Integer number = jdbc.queryForObject(querry, Integer.class, timeSlotId);
        if(number>0){
            throw new UnsupportedOperationException("Cancellation is not allowed within 24 hours of the time slot.");
        }
        else{
            querry="UPDATE time_slots SET userid = NULL WHERE timeslotid=?";
            jdbc.update(querry,
                    timeSlotId);
        }

    }


    public List<Slot> getO(int courtId, int userId) {
        String querry="SELECT * FROM time_slots natural left join users WHERE courtid = ?";
        RowMapper<Slot> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Slot rowObject = new Slot();
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setPrice(String.valueOf(r.getFloat("price")));
            rowObject.setStartTimestamp(r.getTimestamp("starttimestamp").toLocalDateTime());
            rowObject.setEndTimestamp(r.getTimestamp("endtimestamp").toLocalDateTime());
            rowObject.setUser(user);
            rowObject.setTimeSlotId(r.getInt("timeslotid"));
            rowObject.setBooked(r.getInt("userid") != 0);
            return rowObject;
        };
        return jdbc.query(querry, purchaseRowMapper,courtId);
    }

    public List<Slot> getP(int courtId, int userId) {
        String querry="SELECT * FROM time_slots natural left join users WHERE courtid = ?";
        RowMapper<Slot> purchaseRowMapper = (r, i) -> {
            User user = new User();
            int reservedUserId = r.getInt("userid");
            if (userId == reservedUserId) {
                user.setUserId(r.getInt("userid"));
                user.setFirstName(r.getString("firstname"));
                user.setLastName(r.getString("lastname"));
            }
            Slot rowObject = new Slot();
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setPrice(String.valueOf(r.getFloat("price")));
            rowObject.setStartTimestamp(r.getTimestamp("starttimestamp").toLocalDateTime());
            rowObject.setEndTimestamp(r.getTimestamp("endtimestamp").toLocalDateTime());
            rowObject.setUser(user);
            rowObject.setTimeSlotId(r.getInt("timeslotid"));
            rowObject.setBooked(reservedUserId != 0 && userId != reservedUserId);
            return rowObject;
        };
        return jdbc.query(querry, purchaseRowMapper,courtId);
    }


    public Slot getSlot(int id) {
        String querry="SELECT * FROM time_slots WHERE timeslotid= ?";
        RowMapper<Slot> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            Slot rowObject = new Slot();
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setPrice(String.valueOf(r.getFloat("price")));
            rowObject.setStartTimestamp(r.getTimestamp("starttimestamp").toLocalDateTime());
            rowObject.setEndTimestamp(r.getTimestamp("endtimestamp").toLocalDateTime());
            rowObject.setUser(user);
            rowObject.setTimeSlotId(r.getInt("timeslotid"));
            return rowObject;
        };
        return jdbc.query(querry, purchaseRowMapper,id).get(0);
    }
    public void brojTermina(int courtId) {
        throw new UnsupportedOperationException("Broj termina na pojedinom terenu nije implementirano");
    }
}
