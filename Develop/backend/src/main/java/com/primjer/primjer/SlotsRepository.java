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
        String querry="SELECT * FROM slots WHERE courtid = ? and starttimestamp between (?,?) and endtimestamp between (?,?)";
        RowMapper<Slot> purchaseRowMapper = (r, i) -> {
            Slot rowObject = new Slot();
            rowObject.setCourtId(r.getInt("courtid"));
            rowObject.setPrice(r.getString("price"));
            rowObject.setStartTimestamp(r.getTimestamp("starttimestamp"));
            rowObject.setEndTimestamp(r.getTimestamp("endtimestamp"));
            /*rowObject.setUserId(r.getInt("userid"));
            rowObject.setEmail(r.getString("email"));
            rowObject.setFirstName(r.getString("firstname"));
            rowObject.setLastName(r.getString("lastname"));
            rowObject.setRoleId(r.getInt("roleid"));
            rowObject.setPhoneNumber(r.getString("phonenumber"));*/
            return rowObject;
        };
        List<Slot> lista=jdbc.query(querry, purchaseRowMapper,slot.getCourtId(),slot.getStartTimestamp(),slot.getEndTimestamp(),slot.getStartTimestamp(),slot.getEndTimestamp());
        if(!lista.isEmpty()){
            return lista;
        }
        else{
            querry="INSERT INTO time_slots(starttimestamp,endtimestamp,price,courtid) VALUES(?,?,?,?)";
            jdbc.update(querry,
                    slot.getStartTimestamp(),slot.getEndTimestamp(),slot.getPrice(),slot.getCourtId());
        }
        return null;
    }
}
