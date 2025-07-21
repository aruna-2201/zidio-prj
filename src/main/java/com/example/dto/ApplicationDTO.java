package com.example.dto;

import java.time.LocalDate;


public class ApplicationDTO {

    private String jobTitle;
    private String company;
    private String location;
    private LocalDate appliedDate;
    private String status;
    private Long jobId; // for linking to job detail page

    // --- Constructors ---
    public ApplicationDTO() {}

    public ApplicationDTO(String jobTitle, String company, String location,
                          LocalDate appliedDate, String status, Long jobId) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.appliedDate = appliedDate;
        this.status = status;
        this.jobId = jobId;
    }

    // --- Getters and Setters ---

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }
}
