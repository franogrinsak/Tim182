package com.primjer.primjer;

import com.primjer.primjer.court.Court;
import com.primjer.primjer.court.CourtRepository;
import com.primjer.primjer.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)  // Enable Mockito Extension for JUnit 5
public class TestCourtRepo {
    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private CourtRepository courtRepository;

    private Court testCourt;
    private User testUser;

    @BeforeEach
    public void setUp() {
        // Initialize the test court and user objects
        testUser = new User();
        testUser.setUserId(1);
        testUser.setFirstName("John");
        testUser.setLastName("Doe");

        testCourt = new Court();
        testCourt.setCourtId(1);
        testCourt.setCourtName("Test Court");
        testCourt.setLocation("Test Location");
        testCourt.setisIndoor(true);
        testCourt.setImage("testImage.jpg");
        testCourt.setUser(testUser);
    }

    @Test
    public void testGetCourts() {
        // Mock the query result
        List<Court> expectedCourts = Arrays.asList(testCourt);

        when(jdbcTemplate.query(anyString(), ArgumentMatchers.<RowMapper<Court>>any(), anyInt()))
                .thenReturn(expectedCourts);

        // Act
        List<Court> result = courtRepository.getCourts(1);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testCourt.getCourtName(), result.get(0).getCourtName());
    }

    @Test
    void testGetAllCourts() {
        // Arrange
        JdbcTemplate jdbcTemplate = mock(JdbcTemplate.class);
        CourtRepository courtRepository = new CourtRepository(jdbcTemplate);

        // Stub the query method to match the exact arguments
        when(jdbcTemplate.query(
                eq("SELECT * FROM courts natural join users"),
                any(RowMapper.class) // Assuming the RowMapper is the lambda or a class that implements it
        )).thenReturn(new ArrayList<>());  // Assuming you're expecting an empty list for this test case

        // Act
        List<Court> courts = courtRepository.getAllCourts();

        // Assert
        verify(jdbcTemplate).query(
                eq("SELECT * FROM courts natural join users"),
                any(RowMapper.class)
        );

        // You can add further assertions to check the list returned
        assertNotNull(courts);
        assertTrue(courts.isEmpty());
    }



}