package com.example.demo.repositories;

import com.example.demo.entities.Utilisateur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {
    Optional<Utilisateur> findByEmail(String email);
    Optional<Utilisateur> findByPrenomAndNom(String prenom, String nom);

}
