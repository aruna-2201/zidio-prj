package com.example.dto;

import java.util.List;

public class StudentDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String location;
    
    private List<EducationDTO> education;
    private List<SkillDTO> skills;
    private List<ExperienceDTO> experience;

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
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public List<EducationDTO> getEducation() {
        return education;
    }
    public void setEducation(List<EducationDTO> education) {
        this.education = education;
    }
    public List<SkillDTO> getSkills() {
        return skills;
    }
    public void setSkills(List<SkillDTO> skills) {
        this.skills = skills;
    }
    public List<ExperienceDTO> getExperience() {
        return experience;
    }
    public void setExperience(List<ExperienceDTO> experience) {
        this.experience = experience;
    }
}
