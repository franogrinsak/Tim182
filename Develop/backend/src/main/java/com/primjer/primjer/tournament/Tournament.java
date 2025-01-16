package com.primjer.primjer.tournament;

import com.primjer.primjer.court.Court;
import com.primjer.primjer.user.User;

import java.time.LocalDate;

public class Tournament {
        private int tournamentId;
        private String tournamentName;
        private LocalDate date;
        private float registrationFee;
        private float reward;
        private String description;
        private boolean isOpen=true;
        private String playerLevel;
        private String results;
        private User user;
        private Court court;

        public int getTournamentId() {
            return tournamentId;
        }

        public void setTournamentId(int tournamentId) {
            this.tournamentId = tournamentId;
        }
        public String getTournamentName() {
            return tournamentName;
        }

        public void setTournamentName(String tournamentName) {
            this.tournamentName = tournamentName;
        }

        public float getRegistrationFee() {
        return registrationFee;
    }

    public void setRegistrationFee(float registrationFee) {
        this.registrationFee = registrationFee;
    }

    public float getReward() {
        return reward;
    }

    public void setReward(float reward) {
        this.reward = reward;
    }

    public String getPlayerLevel() {
        return playerLevel;
    }

    public void setPlayerLevel(String playerLevel) {
        this.playerLevel = playerLevel;
    }

    public String getResults() {
        return results;
    }

    public void setResults(String results) {
        this.results = results;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Court getCourt() {
        return court;
    }

    public void setCourt(Court court) {
        this.court = court;
    }
}


