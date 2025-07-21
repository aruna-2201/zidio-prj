package com.example.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.dto.ApplicationDTO;
import com.example.entity.Application;
import com.example.entity.Student;
import com.example.repo.ApplicationRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<ApplicationDTO> getApplicationsByStudentId(Long studentId) {
        List<Application> applications = applicationRepository.findByStudentId(studentId);
        return applications.stream().map(app -> new ApplicationDTO(
                app.getJob().getTitle(),
                app.getJob().getCompany(),
                app.getJob().getLocation(),
                app.getAppliedDate(),
                app.getStatus(),
                app.getJob().getId()
        )).collect(Collectors.toList());
    }
}
