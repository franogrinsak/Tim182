package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
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

    public void book(int timeSlotId) {
        String querry="UPDATE time_slots SET isbooked=TRUE WHERE timeslotid=?";
        jdbc.update(querry,
                timeSlotId);
    }
}
