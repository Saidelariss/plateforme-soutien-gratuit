package com.example.demo.services;

import com.example.demo.dto.PostDTO;
import com.example.demo.dto.PostDtoResponse;
import com.example.demo.entities.*;
import com.example.demo.repositories.CompetenceRepository;
import com.example.demo.repositories.PostRepository;
import com.example.demo.repositories.UtilisateurRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Data
@AllArgsConstructor

public class PostService {
    PostRepository postRepository;
    UtilisateurRepository utilisateurRepository;
    CompetenceRepository competenceRepository;

    public  Post savePost(PostDTO postDTO){
        Post post = new Post();
        Competence competence = competenceRepository.findByNom(postDTO.getCompetenceName()).orElse(null);
        Apprenti apprenti = (Apprenti)utilisateurRepository.findByEmail(postDTO.getEmailApprenti()).orElse(null);

        post.setTitre(postDTO.getTitre());
        post.setContenu(postDTO.getContenu());
        post.setCompetence(competence);
        post.setApprenti(apprenti);
        post.setDatePublication(new Date());

        Post savedPost = postRepository.save(post);
        return savedPost;
    }

   /* public Post savePost(Post post, String email,Competence competence){

        System.out.println("email "+email);
        Apprenti apprenti =(Apprenti) utilisateurRepository.findByEmail(email).orElse(null);

        post.setApprenti(apprenti);
        post.setDatePublication(new Date());
        post.setCompetence(competence);
        apprenti.getPosts().add(post);

        return postRepository.save(post);
    }*/
    public List<PostDtoResponse> getAllPostsByApprenti(String email){
        System.out.println("email : ==="+email);
        Apprenti apprenti= (Apprenti) utilisateurRepository.findByEmail(email).orElse(null);
        List<Post> posts =  apprenti.getPosts();
        List<PostDtoResponse>  postDtoResponses=new ArrayList<PostDtoResponse>();

        for(Post post : posts){

            PostDtoResponse postDtoResponse = new PostDtoResponse();
            postDtoResponse.setTitre(post.getTitre());
            postDtoResponse.setId(post.getId());
            postDtoResponse.setContenu(post.getContenu());
            postDtoResponse.setCompetenceName(post.getCompetence().getNom());
            postDtoResponse.setDatePublication(post.getDatePublication());

            postDtoResponses.add(postDtoResponse);

        }
        return postDtoResponses;

    }

    public List<Post> getAllPostsByFormateur(String email) {
        Formateur formateur = (Formateur) utilisateurRepository.findByEmail(email).orElse(null);
        List<Competence> sesCompetences = formateur.getCompetences();
        List<Post> posts = new ArrayList<>();

        for (Competence competence : sesCompetences) {
            posts.addAll( competence.getPosts());
        }

        return posts;
    }

}
