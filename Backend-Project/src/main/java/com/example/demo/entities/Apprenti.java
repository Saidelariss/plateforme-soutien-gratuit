package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = false)
@Entity
@Data
 @AllArgsConstructor @NoArgsConstructor
@DiscriminatorValue("APPR")
public class Apprenti extends Utilisateur{

    @OneToMany(mappedBy = "apprenti")
   @JsonIgnore
    private List<Post> posts = new ArrayList<>();

}
