package com.example.demo.repositories;

import com.example.demo.entities.Post;
import com.example.demo.entities.Validation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ValidationRepository extends JpaRepository<Validation,Long> {
    List<Validation> findByPost(Post post);
}
