package com.primjer.primjer.court;

import com.primjer.primjer.user.User;

public class Court {
    private int courtId;
    private String courtName;
    private String location;
    private boolean isIndoor;
    private String image;
    private User user;
    public int getCourtId() {
        return courtId;
    }

    public void setCourtId(int courtId) {
        this.courtId = courtId;
    }
    public String getCourtName() {
        return courtName;
    }

    public void setCourtName(String courtName) {
        this.courtName = courtName;
    }
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    public boolean getisIndoor() {
        return isIndoor;
    }

    public void setisIndoor(boolean indoor) {
        isIndoor = indoor;
    }
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
