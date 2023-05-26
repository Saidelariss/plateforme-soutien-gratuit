package com.example.demo.services;

import com.example.demo.dto.FormateurDTO;
import com.example.demo.dto.PostDTO;
import com.example.demo.entities.*;
import com.example.demo.repositories.PostRepository;
import com.example.demo.repositories.UtilisateurRepository;
import com.example.demo.repositories.ValidationRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

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

    public Boolean validateByFormateur(PostDTO postDTO, Formateur formateur) {
        try {
            Validation validation = new Validation();
            validation.setFormateur(formateur);
            Post post = postRepository.findById(postDTO.getId()).orElse(null);
            validation.setPost(post);
            validation.setFormateurAccepte(true);
            validation.setApprentiAccepte(false);

            Validation savedValidation = validationRepository.save(validation);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public List<FormateurDTO> getFormateursAccepteByPost(PostDTO postDTO) {
        List<FormateurDTO> formateurs = new ArrayList<>();
        Post post = postRepository.findById(postDTO.getId()).orElse(null);
        FormateurDTO formateurDTO;
        Formateur formateur;
        // select validation de post
        List<Validation> validations = post.getValidations();
        // pour chaque validation , if accepteformateur true ajouter formateur dial validation f list formateur

        for (Validation validation : validations) {
            if (validation.getFormateurAccepte() == true) {
                formateur = validation.getFormateur();
                formateurDTO = new FormateurDTO();
                formateurDTO.setId(formateur.getId());
                formateurDTO.setPrenom(formateur.getPrenom());
                formateurDTO.setNom(formateur.getNom());
                formateurDTO.setEmail(formateur.getEmail());
                formateurDTO.setTelephone(formateur.getTelephone());

                formateurs.add(formateurDTO);

            }
        }
        return formateurs;
    }


    public Boolean validateByApprenti(PostDTO postDTO, FormateurDTO formateurDTO) {
        try {
            Post post = postRepository.findById(postDTO.getId()).orElse(null);
            Formateur formateur = (Formateur) utilisateurRepository.findByEmail(formateurDTO.getEmail()).orElse(null);

            Validation validation = validationRepository.findByFormateurAndPost(formateur,post).orElse(null);

            validation.setApprentiAccepte(true);

           Validation savedValidation = validationRepository.save(validation);
            return true;
        } catch (Exception e) {
            return false;
        }

    }
    public FormateurDTO getFormateurByPrenomAndNom(String prenom, String nom)
    {
        Utilisateur user = utilisateurRepository.findByPrenomAndNom(prenom,nom).orElse(null);

        if(user instanceof Formateur)
        {
            FormateurDTO formateurDTO = new FormateurDTO();
            formateurDTO.setId(user.getId());
            formateurDTO.setNom(user.getNom());
            formateurDTO.setPrenom(user.getPrenom());
            formateurDTO.setEmail(user.getEmail());
            formateurDTO.setTelephone(user.getTelephone());
            return formateurDTO;
        }
        else return null;
    }
}
