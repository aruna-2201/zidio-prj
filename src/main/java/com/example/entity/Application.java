package com.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Application {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Relation: Many Applications belong to one Student
	@ManyToOne
	@JoinColumn(name = "student_id", nullable = false)
	private Student student;

	// Relation: Many Applications belong to one Job
	@ManyToOne
	@JoinColumn(name = "job_id", nullable = false)
	private Job job;

	private LocalDate appliedDate;

	private String status; // PENDING, IN_REVIEW, INTERVIEW, REJECTED

	// --- Constructors ---
	public Application() {
	}

	public Application(Student student, Job job, LocalDate appliedDate, String status) {
		this.student = student;
		this.job = job;
		this.appliedDate = appliedDate;
		this.status = status;
	}

	// --- Getters and Setters ---
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
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
}
