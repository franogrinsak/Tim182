package com.primjer.primjer;
import com.primjer.primjer.court.Court;
import com.primjer.primjer.court.CourtRepository;
import com.primjer.primjer.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class CourtRepoTests {

    @Autowired
    private CourtRepository courtRepo;


    @Test
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

    }
    @Test
    public void testDeleteCourt() {
        assertNotNull(courtRepo);
        assertThrows(UnsupportedOperationException.class, () -> {
            courtRepo.deleteCourt(1);
        });

    }
}
