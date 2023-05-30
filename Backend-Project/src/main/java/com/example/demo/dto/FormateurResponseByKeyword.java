package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormateurResponseByKeyword {
    private String email;
    private String nom;
    private String prenom;
    private String telephone;
    private List<String> competences = new ArrayList<String>();
}
