package com.example.demo.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
 @AllArgsConstructor @NoArgsConstructor
@Data
public class Post {
    @Id @Column(name = "Post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    @Column(columnDefinition = "TEXT")
    private String contenu;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date datePublication;

    @ManyToOne
    private Apprenti apprenti;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Validation> validations = new ArrayList<>();


    @ManyToOne(cascade=CascadeType.ALL)
    private Competence competence;

    }
