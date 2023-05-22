package com.example.demo.security;

import com.example.demo.entities.Utilisateur;
import com.example.demo.repositories.UtilisateurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component

public class UserInfoDetailsService implements UserDetailsService {
    @Autowired
    UtilisateurRepository utilisateurRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Utilisateur> userInfo = utilisateurRepository.findByEmail(username);

        return userInfo.map(UserInfoUserDetails::new) // userInfo -> new UserInfoUserDetails(userInfo)
                .orElseThrow(() -> new UsernameNotFoundException("user not found : " + username));
    }
}
