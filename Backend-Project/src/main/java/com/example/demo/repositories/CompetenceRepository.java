package com.example.demo.repositories;

import com.example.demo.entities.Competence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompetenceRepository extends JpaRepository<Competence,Long> {
    Competence findByNom(String Nom);
}
