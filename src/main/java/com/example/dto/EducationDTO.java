package com.example.dto;

public class EducationDTO {
    private Long id;
    private String school;
    private String degree;
    private int startYear;
    private int endYear;
    private double gpa;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public int getStartYear() { return startYear; }
    public void setStartYear(int startYear) { this.startYear = startYear; }

    public int getEndYear() { return endYear; }
    public void setEndYear(int endYear) { this.endYear = endYear; }

    public double getGpa() { return gpa; }
    public void setGpa(double gpa) { this.gpa = gpa; }
}