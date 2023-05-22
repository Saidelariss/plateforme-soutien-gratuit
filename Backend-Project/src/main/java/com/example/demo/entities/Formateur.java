package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = false)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@DiscriminatorValue("FORM")
public class Formateur extends Utilisateur{
    @ManyToMany(mappedBy = "formateurs",fetch = FetchType.EAGER)
    private List<Competence> competences = new ArrayList<>();

    @OneToMany(mappedBy = "formateur")
    private List<Validation> validations = new ArrayList<>();
}
