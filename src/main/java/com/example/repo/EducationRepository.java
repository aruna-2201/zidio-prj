package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Education;

public interface EducationRepository extends JpaRepository<Education, Long> {
    // Example: List<Education> findByStudentId(Long studentId);
}