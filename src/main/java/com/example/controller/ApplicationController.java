package com.example.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ApplicationDTO;
import com.example.entity.Application;
import com.example.repo.ApplicationRepository;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000") // allow React to access backend
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepo;

    @GetMapping("/student/{studentId}")
    public List<ApplicationDTO> getApplicationsByStudent(@PathVariable Long studentId) {
        List<Application> applications = applicationRepo.findByStudentId(studentId);
        
        return applications.stream()
            .filter(app -> app.getJob() != null) // prevent NullPointerException
            .map(app -> {
                ApplicationDTO dto = new ApplicationDTO();
                dto.setJobTitle(app.getJob().getTitle());
                dto.setCompany(app.getJob().getCompany());
                dto.setLocation(app.getJob().getLocation());
                dto.setAppliedDate(app.getAppliedDate());
                dto.setStatus(app.getStatus());
                dto.setJobId(app.getJob().getId());
                return dto;
            })
            .collect(Collectors.toList());
    }
}
