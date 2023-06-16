package com.example.demo.repositories;

import com.example.demo.entities.Formateur;
import com.example.demo.entities.Post;
import com.example.demo.entities.Validation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ValidationRepository extends JpaRepository<Validation,Long> {
    Optional<List<Validation>> findByPost(Post post);
    Optional<Validation> findByFormateurAndPost(Formateur formateur, Post post);

}
