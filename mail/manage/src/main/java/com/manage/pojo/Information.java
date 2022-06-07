package com.manage.pojo;

public class Information {
    Integer id;
    String name;
    String information;
    String address;
    String password;

    public Information() {
    }

    public Information(Integer id, String name, String information, String address, String password) {
        this.id = id;
        this.name = name;
        this.information = information;
        this.address = address;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Information{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", information='" + information + '\'' +
                ", address='" + address + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
