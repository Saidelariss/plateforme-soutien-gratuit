package com.example.demo;

import com.example.demo.entities.Competence;
import com.example.demo.entities.Formateur;
import com.example.demo.entities.Utilisateur;
import com.example.demo.repositories.CompetenceRepository;
import com.example.demo.repositories.UtilisateurRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@SpringBootApplication

public class ProjetJavaUmlBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjetJavaUmlBackendApplication.class, args);
	}

    //@Bean
    CommandLineRunner commandLineRunner(CompetenceRepository competenceRepository, UtilisateurRepository u){
        return args ->{
            Utilisateur formateur =(Formateur) u.findByEmail("formateur@ehtp.ac.ma").orElse(null);
            List<Competence> competences = ((Formateur) formateur).getCompetences();
            for(Competence competence : competences){
                System.out.println("----competence "+competence.getNom());
            }

            };
        };

   @Bean

    CommandLineRunner commandLineRunner(CompetenceRepository competenceRepository,UtilisateurRepository utilisateurRepository,
                                        PasswordEncoder passwordEncoder){
        return args ->{
            Competence competence1 = competenceRepository.findByNom("programmation informatique");
            Competence competence2 = competenceRepository.findByNom("math");


            Formateur formateur1 = (Formateur) utilisateurRepository.findByEmail("safae.formateur@ehtp.ac.ma").orElse(null);

            if (formateur1 == null) {
                formateur1 = new Formateur();
                formateur1.setNom("safae");
                formateur1.setPrenom("el khaoui");
                formateur1.setEmail("safae.elkhaoui@ehtp.ac.ma");
                formateur1.setTelephone("0645251329");
                formateur1.setPassword(passwordEncoder.encode("1234"));

                formateur1 = utilisateurRepository.save(formateur1); // Sauvegarder le formateur et obtenir la référence mise à jour


                competence1.getFormateurs().add(formateur1);
                competence2.getFormateurs().add(formateur1);


               // competence1.getFormateurs().add(formateur1);
                //competence2.getFormateurs().add(formateur1);

                 competenceRepository.save(competence1);
                 competenceRepository.save(competence2);
            }
            competence1 = competenceRepository.findByNom("marketing et vente");
            competence2 = competenceRepository.findByNom("langues étrangères");


            formateur1 = (Formateur) utilisateurRepository.findByEmail("imane.formateur@ehtp.ac.ma").orElse(null);

            if (formateur1 == null) {
                formateur1 = new Formateur();
                formateur1.setNom("imane");
                formateur1.setPrenom("el mazouzy");
                formateur1.setEmail("imane.elmazouzy@ehtp.ac.ma");
                formateur1.setTelephone("0675856982");
                formateur1.setPassword(passwordEncoder.encode("1234"));

                formateur1 = utilisateurRepository.save(formateur1); // Sauvegarder le formateur et obtenir la référence mise à jour


                competence1.getFormateurs().add(formateur1);
                competence2.getFormateurs().add(formateur1);


                // competence1.getFormateurs().add(formateur1);
                //competence2.getFormateurs().add(formateur1);

                competenceRepository.save(competence1);
                competenceRepository.save(competence2);
            }






        };
    }



}
