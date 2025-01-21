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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")  // Use 'test' profile for testing
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
}
