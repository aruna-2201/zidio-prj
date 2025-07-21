package com.example.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Application;
import com.example.entity.Student;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
	List<Application> findByStudentId(Long studentId); 
}
