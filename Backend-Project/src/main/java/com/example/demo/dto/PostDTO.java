package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class PostDTO {
    private Long id;
    private String titre;
    private String contenu;
    private String emailApprenti;
    private String competenceName;

}

