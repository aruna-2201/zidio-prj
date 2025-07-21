package com.example.entity;

import java.util.Objects;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name; // e.g. ROLE_ADMIN, ROLE_STUDENT

	public Role() {
	}

	public Role(String name) {
		this.name = name;
	}

	// === Getters and Setters ===
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	// === equals & hashCode ===
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (!(o instanceof Role))
			return false;
		Role role = (Role) o;
		return Objects.equals(id, role.id) && Objects.equals(name, role.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}

	@Override
	public String toString() {
		return "Role{id=" + id + ", name='" + name + "'}";
	}
}
