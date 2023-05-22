package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDtoResponse {
    private Long id;
    private String titre;
    private String contenu;
  //  private String emailApprenti;
    private String competenceName;
    private Date DatePublication;
}
