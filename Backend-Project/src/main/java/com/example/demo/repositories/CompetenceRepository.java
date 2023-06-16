package com.example.demo.repositories;

import com.example.demo.entities.Competence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompetenceRepository extends JpaRepository<Competence,Long> {
    Optional <Competence> findByNom(String Nom);
}
