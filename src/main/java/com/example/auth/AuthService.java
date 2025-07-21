package com.example.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.entity.Role;
import com.example.entity.User;
import com.example.repo.RoleRepository;
import com.example.repo.UserRepository;
import com.example.service.AuthResponse;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Register a new user
     */
    public String register(String fullName, String email, String password, String roleName) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Collections.singleton(role));

        userRepository.save(user);

        return "User registered successfully";
    }

    /**
     * Authenticate a user and return a JWT token + user info
     */
    public AuthResponse login(String email, String password, String roleName) throws AccessDeniedException {
        // 1. Authenticate user credentials
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );

        // 2. Fetch authenticated user from DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Validate the requested role
        Role selectedRole = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        if (!user.getRoles().contains(selectedRole)) {
            throw new AccessDeniedException("User does not have the selected role");
        }

        // 4. Prepare "ROLE_" prefixed role names for JWT & security
        List<String> rolesForToken = user.getRoles().stream()
        		.map(role -> role.getName().toUpperCase())
                .collect(Collectors.toList());

        // 5. Generate JWT
        String token = jwtUtil.generateToken(email, rolesForToken);

        // 6. Set Spring Security context manually
        List<GrantedAuthority> authorities = rolesForToken.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authToken);

        return new AuthResponse(token, user);
    }
}