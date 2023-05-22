package com.example.demo.repositories;

import com.example.demo.entities.Validation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ValidationRepository extends JpaRepository<Validation,Long> {
}
