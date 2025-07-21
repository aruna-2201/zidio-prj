package com.example.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Student;
import com.example.repo.StudentRepository;
import com.example.service.StudentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173") // adjust frontend URL here
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    // GET: Fetch profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getProfile(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    // POST: Create new profile
    @PostMapping
    public ResponseEntity<Student> createProfile(@RequestBody Student student) {
        Student savedStudent = studentService.createStudentProfile(student);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    // PUT: Update existing profile
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateProfile(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Student student = studentService.updateStudentProfile(id, updatedStudent);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    // DELETE: Delete profile by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}