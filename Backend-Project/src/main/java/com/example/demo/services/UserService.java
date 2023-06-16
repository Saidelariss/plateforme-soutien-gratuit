package com.example.demo.services;

import com.example.demo.dto.FormateurResponseByKeyword;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
            Competence c = competenceRepository.findByNom(competencesName).orElse(null);
            if(c==null)
            {
                Competence competence = new Competence();
                competence.setNom(competencesName);
                competence = competenceRepository.save(competence);
                competence.getFormateurs().add(formateur);
                competences.add(competence);

            }
            else {competences.add(c);}
        }
        formateur.setCompetences(competences);

        for (Competence competence : formateur.getCompetences()){
            competence.getFormateurs().add(formateur);
        }
        return (Formateur) utilisateurRepository.save(formateur);
    }

    public List<FormateurResponseByKeyword> searchFormateursByKeyword(String keyword){
        List<Utilisateur> utilisateurs=  utilisateurRepository.findByEmailContains(keyword);
        return getFormateurResponseByKeywords(utilisateurs);

    }
    public List<FormateurResponseByKeyword> getAllFormateurs(){

        List<Utilisateur> utilisateurs=  utilisateurRepository.findAll();
        return getFormateurResponseByKeywords(utilisateurs);

    }
    private List<FormateurResponseByKeyword> getFormateurResponseByKeywords(List<Utilisateur> utilisateurs) {
        List<FormateurResponseByKeyword> formateurResponseByKeywords = new ArrayList<>();
        for(Utilisateur user : utilisateurs){
            if(user instanceof Formateur){
                FormateurResponseByKeyword formateurResponse = new FormateurResponseByKeyword();
                formateurResponse.setNom(user.getNom());
                formateurResponse.setPrenom(user.getPrenom());
                formateurResponse.setEmail(user.getEmail());
                formateurResponse.setTelephone(user.getTelephone());
                formateurResponse.setImage(user.getImage());
                for (Competence competence : ((Formateur) user).getCompetences()){
                    formateurResponse.getCompetences().add(competence.getNom());
                }
                formateurResponseByKeywords.add(formateurResponse);
            }
        }
        return formateurResponseByKeywords;
    }



        public void telechargerImageProfil(Long id, MultipartFile image) throws IOException {
            Utilisateur utilisateur = utilisateurRepository.findById(id).orElse(null);

            utilisateur.setImage(image.getBytes());
            utilisateurRepository.save(utilisateur);
        }

        public byte[] recupererImageProfil(Long id) {
            Utilisateur utilisateur = utilisateurRepository.findById(id).orElse(null);
            return utilisateur.getImage();
        }

        public void modifierImageProfil(Long id, MultipartFile image) throws IOException {
            Utilisateur utilisateur = utilisateurRepository.findById(id).orElse(null);
            utilisateur.setImage(image.getBytes());
            utilisateurRepository.save(utilisateur);
        }




}
