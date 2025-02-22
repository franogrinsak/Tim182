package com.primjer.primjer.tournament;

import com.primjer.primjer.model.Comment;
import com.primjer.primjer.model.Image;
import com.primjer.primjer.model.Participations;
import com.primjer.primjer.court.Court;
import com.primjer.primjer.user.User;
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

    public Integer addTournament(Tournament tournament) {
        String querry = "SELECT COUNT(*) FROM tournaments WHERE tournamentname= ? ";
        Integer number = jdbc.queryForObject(querry, Integer.class, tournament.getTournamentName());
        if(number>0){
            return 0;
        }
        querry = "INSERT INTO tournaments(tournamentname,date,registrationfee,reward,playerlevel,description,isopen,userid,courtid) VALUES(?,?,?,?,?,?,?,?,?)";
        jdbc.update(querry,
                tournament.getTournamentName(), tournament.getDate(), tournament.getRegistrationFee(), tournament.getReward(), tournament.getPlayerLevel(), tournament.getDescription(), tournament.isOpen(), tournament.getUser().getUserId(), tournament.getCourt().getCourtId());
        return 1;
    }

    public List<Tournament> getAllTournaments() {
        String querry = "SELECT * FROM tournaments join courts on tournaments.courtId = courts.courtId join users on tournaments.userId = users.userId";
        RowMapper<Tournament> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Court court = new Court();
            court.setCourtId(r.getInt("courtid"));
            court.setisIndoor(r.getBoolean("isindoor"));
            court.setCourtName(r.getString("courtname"));
            court.setLocation(r.getString("location"));
            Tournament rowObject = new Tournament();
            rowObject.setUser(user);
            rowObject.setCourt(court);
            rowObject.setTournamentName(r.getString("tournamentname"));
            rowObject.setTournamentId(r.getInt("tournamentid"));
            rowObject.setDate(r.getDate("date").toLocalDate());
            rowObject.setRegistrationFee(r.getFloat("registrationfee"));
            rowObject.setReward(r.getFloat("reward"));
            rowObject.setOpen(r.getBoolean("isopen"));
            rowObject.setPlayerLevel(r.getString("playerlevel"));

            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper);
    }

    public List<Tournament> getOwnersTournaments(int userId) {
        String querry = "SELECT * FROM tournaments join courts on tournaments.courtId = courts.courtId join users on tournaments.userId = users.userId WHERE courts.userId = ?";
        RowMapper<Tournament> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Court court = new Court();
            court.setCourtId(r.getInt("courtid"));
            court.setisIndoor(r.getBoolean("isindoor"));
            court.setCourtName(r.getString("courtname"));
            court.setLocation(r.getString("location"));
            Tournament rowObject = new Tournament();
            rowObject.setUser(user);
            rowObject.setCourt(court);
            rowObject.setTournamentName(r.getString("tournamentname"));
            rowObject.setTournamentId(r.getInt("tournamentid"));
            rowObject.setDate(r.getDate("date").toLocalDate());
            rowObject.setRegistrationFee(r.getFloat("registrationfee"));
            rowObject.setReward(r.getFloat("reward"));
            rowObject.setOpen(r.getBoolean("isopen"));
            rowObject.setPlayerLevel(r.getString("playerlevel"));

            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper, userId);
    }

    public void finishTournament(Tournament tournament) {
        String querry="UPDATE tournaments SET  isOpen=false, results = ? WHERE tournamentId = ?";
        jdbc.update(querry,tournament.getResults(),tournament.getTournamentId());
    }

    public Tournament getTournaments(int tournamentId) {
        String querry = "SELECT * FROM tournaments join courts on tournaments.courtId = courts.courtId join users on tournaments.userId = users.userId WHERE tournamentId=?";
        RowMapper<Tournament> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Court court = new Court();
            court.setCourtId(r.getInt("courtid"));
            court.setisIndoor(r.getBoolean("isindoor"));
            court.setCourtName(r.getString("courtname"));
            court.setLocation(r.getString("location"));
            Tournament rowObject = new Tournament();
            rowObject.setUser(user);
            rowObject.setCourt(court);
            rowObject.setTournamentName(r.getString("tournamentname"));
            rowObject.setTournamentId(r.getInt("tournamentid"));
            rowObject.setDate(r.getDate("date").toLocalDate());
            rowObject.setRegistrationFee(r.getFloat("registrationfee"));
            rowObject.setReward(r.getFloat("reward"));
            rowObject.setOpen(r.getBoolean("isopen"));
            rowObject.setPlayerLevel(r.getString("playerlevel"));
            rowObject.setDescription((r.getString("description")));
            rowObject.setResults((r.getString("results")));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper, tournamentId).get(0);
    }


    public void TournamentSignUp(Participations participations) {
        String querry = "INSERT INTO participations(userid,tournamentid) VALUES(?,?)";
        jdbc.update(querry, participations.getUser().getUserId(), participations.getTournament().getTournamentId());
    }

    public void approveTournament(Participations participations) {
        String querry="UPDATE participations SET  isApproved=true WHERE userId=? AND tournamentId = ?";
        jdbc.update(querry,participations.getUser().getUserId(),participations.getTournament().getTournamentId());
    }

    public void denyTournament(Participations participations) {
        String querry="UPDATE participations SET isDenied = true, isApproved = false WHERE userId = ? AND tournamentId = ?";
        jdbc.update(querry,participations.getUser().getUserId(),participations.getTournament().getTournamentId());
    }

    public List<Participations> applicationsTournaments(int tournamentId) {
        String querry = "SELECT * FROM participations JOIN users ON participations.userId= users.userId  WHERE tournamentId = ? AND isDenied <> true";
        RowMapper<Participations> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            Tournament tournament = new Tournament();
            tournament.setTournamentId(r.getInt("tournamentid"));
            Participations rowObject = new Participations();
            rowObject.setUser(user);
            rowObject.setTournament(tournament);
            rowObject.setApproved(r.getBoolean("isapproved"));
            rowObject.setDenied(r.getBoolean("isDenied"));
            rowObject.setSignUpTime(r.getTimestamp("signUpTime"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper, tournamentId);

    }

    public Participations applicationTournaments(int tournamentId,int userId) {
        String querry = "SELECT * FROM participations WHERE tournamentId = ? AND userId = ?";
        RowMapper<Participations> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            Tournament tournament = new Tournament();
            tournament.setTournamentId(r.getInt("tournamentid"));
            Participations rowObject = new Participations();
            rowObject.setUser(user);
            rowObject.setTournament(tournament);
            rowObject.setApproved(r.getBoolean("isapproved"));
            rowObject.setDenied(r.getBoolean("isDenied"));
            rowObject.setSignUpTime(r.getTimestamp("signUpTime"));
            return rowObject;
        };

        List<Participations> participations = jdbc.query(querry, purchaseRowMapper, tournamentId, userId);
        return participations.isEmpty() ? null : participations.get(0);
    }

    public List<Participations> applicationsplayerTournaments(int userId) {
        String querry = "SELECT * FROM participations WHERE userId = ?";
        RowMapper<Participations> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            Tournament tournament = new Tournament();
            tournament.setTournamentId(r.getInt("tournamentid"));
            Participations rowObject = new Participations();
            rowObject.setUser(user);
            rowObject.setTournament(tournament);
            rowObject.setApproved(r.getBoolean("isapproved"));
            rowObject.setDenied(r.getBoolean("isDenied"));
            rowObject.setSignUpTime(r.getTimestamp("signUpTime"));
            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper, userId);

    }

    public void imageAdd(Image image) {
        String querry = "INSERT INTO images(userid,tournamentid,imagecontent) VALUES(?,?,?)";
        jdbc.update(querry,
                image.getUser().getUserId(), image.getTournament().getTournamentId(), image.getImageContent());
    }

    public List<Image> getImages(int tournamentId) {
        String querry = "SELECT * FROM images join tournaments on images.tournamentId = tournaments.tournamentId join users on images.userId = users.userId where images.tournamentId = ? order by uploadTime desc";
        RowMapper<Image> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            user.setRoleId(r.getInt("roleid"));
            Tournament tournament = new Tournament();
            tournament.setTournamentId(r.getInt("tournamentid"));
            Image rowObject = new Image();
            rowObject.setUser(user);
            rowObject.setTournament(tournament);
            rowObject.setImageId(r.getInt("imageid"));
            rowObject.setUploadTime(r.getTimestamp("uploadTime"));
            rowObject.setImageContent(r.getString("imagecontent"));



            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper, tournamentId);
    }

    public void commentAdd(Comment comment) {
        String querry = "INSERT INTO comments(userid,tournamentid,commenttext) VALUES(?,?,?)";
        jdbc.update(querry,
                comment.getUser().getUserId(), comment.getTournament().getTournamentId(), comment.getCommentText());
    }

    public List<Comment> getComments(int tournamentId) {
        String querry = "SELECT * FROM comments join tournaments on comments.tournamentId = tournaments.tournamentId join users on comments.userId = users.userId where comments.tournamentId = ? order by uploadTime desc";
        RowMapper<Comment> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            user.setFirstName(r.getString("firstname"));
            user.setLastName(r.getString("lastname"));
            user.setRoleId(r.getInt("roleid"));
            Tournament tournament = new Tournament();
            tournament.setTournamentId(r.getInt("tournamentid"));
            Comment rowObject = new Comment();
            rowObject.setUser(user);
            rowObject.setTournament(tournament);
            rowObject.setCommentId(r.getInt("commentid"));
            rowObject.setUploadTime(r.getTimestamp("uploadTime"));
            rowObject.setCommentText(r.getString("commenttext"));



            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper, tournamentId);
    }


}
