package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    // Example: List<Skill> findByStudentId(Long studentId);
}