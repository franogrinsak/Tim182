package com.primjer.primjer;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.primjer.primjer.user.User;
import com.primjer.primjer.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import java.util.Optional;

public class TestUserRepo {

    @Mock
    private JdbcTemplate jdbcTemplate;

    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userRepository = new UserRepository(jdbcTemplate);
    }

    @Test
    public void testStoreUser() {
        // Given a user
        User user = new User();
        user.setEmail("test@example.com");

        // Mock JdbcTemplate update method to return 1 (indicating 1 row was updated)
        doReturn(1).when(jdbcTemplate).update(anyString(), (PreparedStatementSetter) any());

        // Call the method under test
        userRepository.storeUser(user);

        // Verify that the update method was called with the expected arguments
        verify(jdbcTemplate, times(1)).update(anyString(), eq(user.getEmail()));
    }

    @Test
    public void testUpdateUser() {
        // Given a user
        User user = new User();
        user.setUserId(1);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setRoleId(2);

        // Mock JdbcTemplate update method to return 1 (indicating 1 row was updated)
        doReturn(1).when(jdbcTemplate).update(anyString(), any(), any(), any(), anyInt());

        // Call the method under test
        userRepository.updateUser(user);

        // Verify that the update method was called with the expected arguments
        verify(jdbcTemplate, times(1)).update(anyString(), eq(user.getFirstName()), eq(user.getLastName()), eq(user.getRoleId()), eq(user.getUserId()));
    }
}
