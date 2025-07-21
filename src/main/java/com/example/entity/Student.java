package com.example.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    private String name;
    private String email;
    private String phone;
    private String location;
    private String avatar;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> education = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experience = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills = new ArrayList<>();

    // Helper methods to keep both sides consistent

    public void addEducation(Education edu) {
        education.add(edu);
        edu.setStudent(this);
    }

    public void removeEducation(Education edu) {
        education.remove(edu);
        edu.setStudent(null);
    }

    public void addExperience(Experience exp) {
        experience.add(exp);
        exp.setStudent(this);
    }

    public void removeExperience(Experience exp) {
        experience.remove(exp);
        exp.setStudent(null);
    }

    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.setStudent(this);
    }

    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.setStudent(null);
    }
}
