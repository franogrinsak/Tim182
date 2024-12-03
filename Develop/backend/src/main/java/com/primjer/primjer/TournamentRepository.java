package com.primjer.primjer;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TournamentRepository {
    private final JdbcTemplate jdbc;

    public TournamentRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void addTournament(Tournament tournament) {
        String querry="INSERT INTO tournaments(tournamentname,date,registrationfee,reward,playerlevel,description,isopen,userid,courtid) VALUES(?,?,?,?,?,?,?,?,?)";
        jdbc.update(querry,
                tournament.getTournamentName(),tournament.getDate(),tournament.getRegistrationFee(),tournament.getReward(),tournament.getPlayerLevel(),tournament.getDescription(),tournament.isOpen(),tournament.getUser().getUserId(),tournament.getCourt().getCourtId());
    }
private void test() {
    System.out.println("testiranje");
}

}
