package com.example.demo.repositories;

import com.example.demo.entities.Utilisateur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {
    Optional<Utilisateur> findByEmail(String email);
    List<Utilisateur> findByEmailContains(String keyword);


}
