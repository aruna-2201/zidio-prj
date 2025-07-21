package com.example.controller;

import java.nio.file.AccessDeniedException;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.auth.AuthService;
import com.example.entity.Role;
import com.example.entity.User;
import com.example.repo.RoleRepository;
import com.example.repo.UserRepository;
import com.example.service.AuthResponse;
import com.example.service.LoginRequest;
import com.example.service.RegisterRequest;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    // === REGISTRATION ===
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        String roleName = "ROLE_" + request.getRole().toUpperCase();
        authService.register(
            request.getFullName(),
            request.getEmail(),
            request.getPassword(),
            roleName
        );
        return ResponseEntity.ok(Map.of("message", "User registered successfully as " + request.getRole()));
    }

    // === LOGIN ===
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String roleName = "ROLE_" + request.getRole().toUpperCase();
            AuthResponse response = authService.login(
                request.getEmail(),
                request.getPassword(),
                roleName
            );
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException | AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Login failed: " + e.getMessage()));
        }
    }
}
