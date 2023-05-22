package com.example.demo.security;

import com.example.demo.entities.Apprenti;
import com.example.demo.entities.Formateur;
import com.example.demo.entities.Utilisateur;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserInfoUserDetails implements UserDetails {
    private String username;
    private String password;
    private List<GrantedAuthority> authorities= new ArrayList<>();

    public UserInfoUserDetails(Utilisateur userInfo){
        this.username=userInfo.getEmail();
        this.password=userInfo.getPassword();
        if(userInfo instanceof Formateur){
            authorities.add(new SimpleGrantedAuthority("ROLE_Formateur"));
        }
        if(userInfo instanceof Apprenti){
            authorities.add(new SimpleGrantedAuthority("ROLE_Apprenti"));
        }
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
