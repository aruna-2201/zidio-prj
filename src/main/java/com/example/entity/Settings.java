package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean darkMode;

    private boolean emailNotifications;

    private boolean smsNotifications;

    private String preferredLanguage; // e.g., "en", "hi"

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    // Constructors
    public Settings() {}

    public Settings(boolean darkMode, boolean emailNotifications, boolean smsNotifications, String preferredLanguage, Student student) {
        this.darkMode = darkMode;
        this.emailNotifications = emailNotifications;
        this.smsNotifications = smsNotifications;
        this.preferredLanguage = preferredLanguage;
        this.student = student;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) { this.id = id; }

    public boolean isDarkMode() {
        return darkMode;
    }

    public void setDarkMode(boolean darkMode) { this.darkMode = darkMode; }

    public boolean isEmailNotifications() {
        return emailNotifications;
    }

    public void setEmailNotifications(boolean emailNotifications) { this.emailNotifications = emailNotifications; }

    public boolean isSmsNotifications() {
        return smsNotifications;
    }

    public void setSmsNotifications(boolean smsNotifications) { this.smsNotifications = smsNotifications; }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) { this.student = student; }
}
