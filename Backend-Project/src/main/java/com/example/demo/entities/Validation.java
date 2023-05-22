package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Validation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean formateurAccepte;
    private Boolean apprentiAccepte;
    @ManyToOne
    private Formateur formateur;

    @ManyToOne
    private Post post;

}
