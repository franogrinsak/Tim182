package com.primjer.primjer.model;

import com.primjer.primjer.tournament.Tournament;
import com.primjer.primjer.user.User;

import java.sql.Timestamp;

public class Participations {
    private Tournament tournament;
    private User user;
    private boolean isApproved;
    private Timestamp signUpTime;
    private boolean isDenied;

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }


    public Timestamp getSignUpTime() {
        return signUpTime;
    }

    public void setSignUpTime(Timestamp signUpTime) {
        this.signUpTime = signUpTime;
    }

    public void setDenied(boolean denied) {
        isDenied = denied;
    }

    public boolean isDenied() {
        return isDenied;
    }
}
