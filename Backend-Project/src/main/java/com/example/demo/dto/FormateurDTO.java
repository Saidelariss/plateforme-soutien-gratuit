package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class FormateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private byte[] image;
}
