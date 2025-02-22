package com.primjer.primjer.notification;

import com.primjer.primjer.notification.Notification;
import com.primjer.primjer.tournament.Tournament;
import com.primjer.primjer.user.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
    public class NotificationRepository {
        private final JdbcTemplate jdbc;

        public NotificationRepository(JdbcTemplate jdbc) {
            this.jdbc = jdbc;
        }

    public List<Notification> getNotifications(int userId) {
        String querry = "SELECT tournaments.userId as ownerId , * FROM notifications join tournaments on notifications.tournamentId=tournaments.tournamentId join users on notifications.userId= users.userId WHERE notifications.userId = ? order by creationTime desc";
        RowMapper<Notification> purchaseRowMapper = (r, i) -> {
            User user = new User();
            user.setUserId(r.getInt("userid"));
            Tournament tournament = new Tournament();
            tournament.setTournamentId(r.getInt("tournamentid"));
            tournament.setTournamentName(r.getString("tournamentname"));
            User owner = new User();
            owner.setUserId(r.getInt("ownerId"));
            tournament.setUser(owner);
            Notification rowObject = new Notification();
            rowObject.setUser(user);
            rowObject.setTournament(tournament);
            rowObject.setNotificationId(r.getInt("notificationid"));
            rowObject.setRead(r.getBoolean("isread"));
            rowObject.setCreationTime(r.getTimestamp("creationtime"));

            return rowObject;
        };

        return jdbc.query(querry, purchaseRowMapper, userId);
    }

    public void markNotifications(int[] notificationIds) {
        String querry = "UPDATE notifications SET isRead=true WHERE notificationId = ?";
        for (int notificationId : notificationIds) {
            jdbc.update(querry, notificationId);
        }
    }

    public void deleteNotifications(int[] notificationIds) {
        String querry="DELETE FROM notifications WHERE notificationId = ? ";
        for (int notificationId : notificationIds) {
            jdbc.update(querry, notificationId);
        }
    }

    public boolean unreadNotifications(int userId) {
        String querry = "SELECT COUNT(*) FROM notifications WHERE userId = ? AND isRead=false";
        Integer number = jdbc.queryForObject(querry, Integer.class, userId);
        if(number>0){
            return true;
        }
        else{
            return false;
        }
    }

    public void subscribed(int userId, boolean isSubscribedToTournaments) {
        String querry = "UPDATE players SET isSubscribedToTournaments=? WHERE userId = ?";
        jdbc.update(querry, isSubscribedToTournaments, userId);

    }


    public boolean getSubscribed(int userId) {
        String querry="SELECT isSubscribedToTournaments FROM players WHERE userId = ?";
        RowMapper<Boolean> purchaseRowMapper = (r, i) -> r.getBoolean("isSubscribedToTournaments");
        return jdbc.query(querry, purchaseRowMapper, userId).get(0);
    }
}
