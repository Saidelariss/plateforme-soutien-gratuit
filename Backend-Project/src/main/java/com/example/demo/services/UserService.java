package com.example.demo.services;

import com.example.demo.entities.Apprenti;
import com.example.demo.entities.Competence;
import com.example.demo.entities.Formateur;
import com.example.demo.entities.Utilisateur;
import com.example.demo.repositories.CompetenceRepository;
import com.example.demo.repositories.UtilisateurRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Data @AllArgsConstructor

public class UserService {
    private UtilisateurRepository utilisateurRepository;
    private CompetenceRepository competenceRepository;
    private PasswordEncoder passwordEncoder;
    public Utilisateur UserAuthentication(String email,String password){

        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElse(null);
        if(utilisateur == null) throw new RuntimeException("Le login est erroné");
        if(!(utilisateur.getPassword().equals(password))) throw new RuntimeException("les identifiants sont erronées");

        return utilisateur;
    }

    public Apprenti saveApprenti(Apprenti apprenti){
        apprenti.setPassword(passwordEncoder.encode(apprenti.getPassword()));

         return (Apprenti) utilisateurRepository.save(apprenti);

    }

    public Formateur saveFormateur(Formateur formateur){
        formateur.setPassword(passwordEncoder.encode(formateur.getPassword()));
        String[] competencesNames = new String[formateur.getCompetences().size()];
        for(int i=0;i<formateur.getCompetences().size();i++){
            competencesNames[i]=formateur.getCompetences().get(i).getNom();
//
        }
        List<Competence> competences = new ArrayList<>();
        for (String competencesName : competencesNames) {
            Competence c = competenceRepository.findByNom(competencesName);
            competences.add(c);
        }
        formateur.setCompetences(competences);

        for (Competence competence : formateur.getCompetences()){
            competence.getFormateurs().add(formateur);
        }
        return (Formateur) utilisateurRepository.save(formateur);
    }

}
