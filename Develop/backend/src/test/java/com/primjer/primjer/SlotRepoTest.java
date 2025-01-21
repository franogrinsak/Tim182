package com.primjer.primjer;

import com.primjer.primjer.court.Court;
import com.primjer.primjer.court.CourtRepository;
import com.primjer.primjer.slot.Slot;
import com.primjer.primjer.slot.SlotsRepository;
import com.primjer.primjer.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class SlotRepoTest {

    @Autowired
    private SlotsRepository slotRepo;
    @Test
    public void testaddSlot() {
        assertNotNull(slotRepo);
        Slot slot=new Slot();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        slot.setStartTimestamp(LocalDateTime.parse("2025-03-25 08:30:00",formatter));
        slot.setEndTimestamp(LocalDateTime.parse("2025-03-25 09:30:00",formatter));
        slot.setCourtId(1);
        slot.setPrice("5.0");
        slotRepo.addSlot(slot);
        Slot slotf =slotRepo.getSlot(4);
        assertEquals(slot.getStartTimestamp(),slotf.getStartTimestamp());
        assertEquals(slot.getStartTimestamp(),slotf.getStartTimestamp());
        assertEquals(slot.getCourtId(),slotf.getCourtId());
        assertEquals(slot.getPrice(),slotf.getPrice());
    }
    @Test
    public void testEdgeaddSlot() {
        assertNotNull(slotRepo);
        Slot slot=new Slot();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        slot.setStartTimestamp(LocalDateTime.parse("2025-03-18 12:00:00",formatter));
        slot.setEndTimestamp(LocalDateTime.parse("2025-03-18 12:30:00",formatter));
        slot.setCourtId(1);
        slot.setPrice("5.0");
        slotRepo.addSlot(slot);
        Slot slotf =slotRepo.getSlot(5);
        assertEquals(slot.getStartTimestamp(),slotf.getStartTimestamp());
        assertEquals(slot.getStartTimestamp(),slotf.getStartTimestamp());
        assertEquals(slot.getCourtId(),slotf.getCourtId());
        assertEquals(slot.getPrice(),slotf.getPrice());
    }

   /*@Test
    public void testaddCourt() {

        assertNotNull(courtRepo);

        Court court=new Court();
        court.setCourtName("teren1");
        court.setLocation("lokacija1");
        court.setisIndoor(true);
        court.setImage("");
        User user=new User();
        user.setUserId(1);
        court.setUser(user);
        courtRepo.addCourt(court);
        Court fcourt=courtRepo.getCourtByName("teren1");
        assertNotNull(fcourt);
        assertEquals("teren1",fcourt.getCourtName());

    }
    @Test
    public void testEditCourt() {

        assertNotNull(courtRepo);

        Court courtEdit=new Court();
        courtEdit.setCourtId(10);
        courtEdit.setCourtName("terenEdit1234");
        courtEdit.setLocation("lokacijaEdit1234");
        courtEdit.setisIndoor(true);
        courtEdit.setImage("aaaaaa");
        User user=new User();
        user.setUserId(1);
        courtEdit.setUser(user);
        courtRepo.editCourt(courtEdit);
        Court fcourt=courtRepo.getCourt(10);
        assertNotNull(fcourt);
        assertEquals("terenEdit1234",fcourt.getCourtName());
        assertEquals("lokacijaEdit1234",fcourt.getLocation());
        assertEquals(true,fcourt.getisIndoor());
        assertEquals("aaaaaa",fcourt.getImage());

    }*/
}
