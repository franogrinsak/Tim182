package com.primjer.primjer;
public class StripeRequest {

    private String name;
    private int timeSlotId;
    private int userId;



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public int getTimeSlotId() {
        return timeSlotId;
    }

    public void setTimeSlotId(int timeSlotId) {
        this.timeSlotId = timeSlotId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}

