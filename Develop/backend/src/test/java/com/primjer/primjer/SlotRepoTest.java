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

import static org.junit.jupiter.api.Assertions.*;


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
        Slot slotf =slotRepo.getSlot(7);
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
        Slot slotf =slotRepo.getSlot(8);
        assertEquals(slot.getStartTimestamp(),slotf.getStartTimestamp());
        assertEquals(slot.getStartTimestamp(),slotf.getStartTimestamp());
        assertEquals(slot.getCourtId(),slotf.getCourtId());
        assertEquals(slot.getPrice(),slotf.getPrice());
    }
    @Test
    public void testBookSlot() {
        assertNotNull(slotRepo);
        int timeSlotId=5;
        int userId=3;
        slotRepo.book(timeSlotId,userId);
        Slot slotf =slotRepo.getSlot(timeSlotId);
        assertEquals(userId,slotf.getUser().getUserId());
    }
    @Test
    public void testCancelSlot() {
        assertNotNull(slotRepo);
        int timeSlotId=6;
        slotRepo.cancel(timeSlotId);
        Slot slotf =slotRepo.getSlot(timeSlotId);
        assertEquals(0,slotf.getUser().getUserId());
    }
    @Test
    public void testCancelErrorSlot() {
        assertNotNull(slotRepo);
        assertThrows(UnsupportedOperationException.class, () -> {
            slotRepo.cancel(4);
        });

    }
    @Test
    public void testUnknownSlot() {
        assertNotNull(slotRepo);
        assertThrows(UnsupportedOperationException.class, () -> {
            slotRepo.brojTermina(1);
        });

    }

}
