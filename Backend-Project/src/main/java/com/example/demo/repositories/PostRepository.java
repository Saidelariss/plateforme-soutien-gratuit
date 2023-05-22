package com.example.demo.repositories;

import com.example.demo.entities.Apprenti;
import com.example.demo.entities.Competence;
import com.example.demo.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Long> {
    Optional<List<Post>> findByApprenti(Apprenti apprenti);
    Optional<List<Post>> findByCompetence(Competence competence);
}
