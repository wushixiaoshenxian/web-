package com.manage.pojo;

public class LeaveMessage {
    Integer mid;
    Integer id;
    String address;
    String message;

    public LeaveMessage(Integer mid, Integer id, String address, String message) {
        this.mid = mid;
        this.id = id;
        this.address = address;
        this.message = message;
    }

    public LeaveMessage() {
    }

    public Integer getMid() {
        return mid;
    }

    public void setMid(Integer mid) {
        this.mid = mid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "information{" +
                "mid=" + mid +
                ", id=" + id +
                ", address='" + address + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
