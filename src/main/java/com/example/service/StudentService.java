package com.example.service;

import org.springframework.stereotype.Service;

import com.example.entity.Education;
import com.example.entity.Experience;
import com.example.entity.Skill;
import com.example.entity.Student;
import com.example.repo.StudentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    public Student createStudentProfile(Student student) {
        linkChildEntities(student);
        return studentRepository.save(student);
    }

    @Transactional
    public Student updateStudentProfile(Long id, Student updatedStudent) {
        Student existingStudent = getStudentById(id);

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPhone(updatedStudent.getPhone());
        existingStudent.setLocation(updatedStudent.getLocation());
        existingStudent.setAvatar(updatedStudent.getAvatar());

        // Clear and repopulate child lists with proper linkage
        existingStudent.getSkills().clear();
        for (Skill skill : updatedStudent.getSkills()) {
            existingStudent.addSkill(skill); // Ensures both sides of relation are set
        }

        existingStudent.getEducation().clear();
        for (Education edu : updatedStudent.getEducation()) {
            existingStudent.addEducation(edu);
        }

        existingStudent.getExperience().clear();
        for (Experience exp : updatedStudent.getExperience()) {
            existingStudent.addExperience(exp);
        }

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with ID: " + id);
        }
        studentRepository.deleteById(id);
    }

    /**
     * Sets the `student` field of each child entity to point back to the parent.
     * Useful for create operations.
     */
    private void linkChildEntities(Student student) {
        if (student.getEducation() != null) {
            for (Education edu : student.getEducation()) {
                edu.setStudent(student);
            }
        }
        if (student.getExperience() != null) {
            for (Experience exp : student.getExperience()) {
                exp.setStudent(student);
            }
        }
        if (student.getSkills() != null) {
            for (Skill skill : student.getSkills()) {
                skill.setStudent(student);
            }
        }
    }
}
