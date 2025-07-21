package com.example.service;

import com.example.entity.User;

public class AuthResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String avatar;
    private String token;

    public AuthResponse() {}

    public AuthResponse(String token, User user) {
        this.token = token;
        this.id = user.getId();
        this.name = user.getFullName();
        this.email = user.getEmail();

        // Assume user has at least one role
        this.role = user.getRoles().stream()
                        .findFirst()
                        .map(r -> r.getName().replace("ROLE_", "").toLowerCase())
                        .orElse("user");

        this.avatar = "https://ui-avatars.com/api/?name=" + 
                      user.getFullName().replace(" ", "+") + 
                      "&background=random";
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
