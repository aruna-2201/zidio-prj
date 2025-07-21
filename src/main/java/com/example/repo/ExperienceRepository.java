package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    // Example: List<Experience> findByStudentId(Long studentId);
}