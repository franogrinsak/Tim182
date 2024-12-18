package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MembershipRepository {
    private final JdbcTemplate jdbc;

    public MembershipRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    public String getPrice() {
        String query = "SELECT membershipprice FROM membership_price LIMIT 1";
        return jdbc.queryForObject(
                query,
                String.class
        );
    }
}
