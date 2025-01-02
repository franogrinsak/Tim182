package com.primjer.primjer.membership;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

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

    public void setPrice(String membershipPrice) {
        BigDecimal bd=new BigDecimal(membershipPrice);
        String querry="UPDATE membership_price SET membershipprice=?";
        jdbc.update(querry, bd);
    }
}
