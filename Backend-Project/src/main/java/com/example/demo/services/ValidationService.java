package com.example.demo.services;

import com.example.demo.dto.*;
import com.example.demo.entities.*;
import com.example.demo.repositories.PostRepository;
import com.example.demo.repositories.UtilisateurRepository;
import com.example.demo.repositories.ValidationRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
@Data
@AllArgsConstructor
public class ValidationService {
    ValidationRepository validationRepository;
    UtilisateurRepository utilisateurRepository;
    PostRepository postRepository;

    public Boolean validatePostByFormateur(ValidatePostByFormateur v) {
        try {
            Validation validation = new Validation();
            Formateur formateur = (Formateur) utilisateurRepository.findByEmail(v.getEmailFormateur()).orElse(null);
            validation.setFormateur(formateur);
            Post post = postRepository.findById(v.getPostId()).orElse(null);
            validation.setPost(post);
            validation.setFormateurAccepte(true);
            validation.setApprentiAccepte(false);
            formateur.getValidations().add(validation);
            post.getValidations().add(validation);
            utilisateurRepository.save(formateur);
            postRepository.save(post);
            Validation savedValidation = validationRepository.save(validation);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public List<FormateurResponse> getFormateursByPost(Long postId) {
        List<FormateurResponse> formateurs = new ArrayList<>();
        Post post = postRepository.findById(postId).orElse(null);
        FormateurResponse formateurResponse;
        Formateur formateur;
        List<Validation> validations = validationRepository.findByPost(post).orElse(null);

        for (Validation validation : validations) {
            if (validation.getFormateurAccepte() == true) {
                formateur = validation.getFormateur();
                formateurResponse = new FormateurResponse();
                formateurResponse.setPrenom(formateur.getPrenom());
                formateurResponse.setNom(formateur.getNom());
                formateurResponse.setEmail(formateur.getEmail());
                formateurResponse.setImage(formateur.getImage());
                formateurResponse.setTelephone(formateur.getTelephone());

                formateurs.add(formateurResponse);

            }
        }
        return formateurs;


    }


    public Boolean validatePostByApprenti(Long postid, String emailFormateur) {
        try {
            Post post = postRepository.findById(postid).orElse(null);
            Formateur formateur = (Formateur) utilisateurRepository.findByEmail(emailFormateur).orElse(null);

            Validation validation = validationRepository.findByFormateurAndPost(formateur,post).orElse(null);

            validation.setApprentiAccepte(true);

            Validation savedValidation = validationRepository.save(validation);
            return true;
        } catch (Exception e) {
            return false;
        }

    }



}




