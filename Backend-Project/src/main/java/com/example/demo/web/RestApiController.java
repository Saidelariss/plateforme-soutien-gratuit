package com.example.demo.web;


import com.example.demo.dto.*;
import com.example.demo.entities.*;
import com.example.demo.repositories.CompetenceRepository;
import com.example.demo.repositories.PostRepository;
import com.example.demo.repositories.UtilisateurRepository;
import com.example.demo.repositories.ValidationRepository;
import com.example.demo.security.UserInfoDetailsService;
import com.example.demo.security.UserInfoUserDetails;
import com.example.demo.services.PostService;
import com.example.demo.services.UserService;
import com.example.demo.services.ValidationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class RestApiController {

    UserService userService;
    PostService postService;
    ValidationService validationService;

    CompetenceRepository competenceRepository;
    UtilisateurRepository utilisateurRepository;

    AuthenticationManager authenticationManager;
    UserInfoDetailsService userInfoDetailsService;

    PostRepository postRepository;
    ValidationRepository validationRepository;

    @PostMapping(path="/register/apprenti")
    public Apprenti saveApprenti(@RequestBody Apprenti apprenti){
        return userService.saveApprenti(apprenti);
    }

    @PostMapping(path="/register/formateur")
    public Formateur saveFormateur(@RequestBody Formateur formateur){

        return userService.saveFormateur(formateur);
    }

    @PostMapping(path="/authenticate")
    public AuthResponse authenticationUser(@RequestBody AuthRequest authRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(),authRequest.getPassword()));

        if(authentication.isAuthenticated()){
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);
            System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
            UserInfoUserDetails user = (UserInfoUserDetails) userInfoDetailsService.loadUserByUsername(authRequest.getUsername());
            // return "User is authenticated";

            AuthResponse authResponse = new AuthResponse(user.getUsername(),null,null,null);
            List<String> roles = new ArrayList<>();
            for(GrantedAuthority authority : user.getAuthorities()){
                String role= authority.toString();
                roles.add(role);

            }
            Utilisateur utilisateur= utilisateurRepository.findByEmail(authResponse.getUsername()).orElse(null);
            authResponse.setRoles(roles);
           authResponse.setNom(utilisateur.getNom());
           authResponse.setPrenom(utilisateur.getPrenom());



            //return new AuthRequest(authRequest.getUsername(),authRequest.getPassword());
            return authResponse;
        }
        else {
            System.out.println("Bad Credentials");
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
    /*public Utilisateur LoginUser(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password, HttpServletResponse response){
        Utilisateur utilisateur=userService.UserAuthentication(email,password);
        Cookie cookie = new Cookie("email", email);
        response.addCookie(cookie);
        return utilisateur;
    }*/

    @PostMapping(path="/apprenti/post")
    public Post savePost(@RequestBody PostDTO postDTO){
        String competenceName = postDTO.getCompetenceName();

       // Competence competence = competenceRepository.findByNom(competenceName);


        return postService.savePost(postDTO);
    }

    @GetMapping(path="/apprenti/posts")
    public List<PostDtoResponse> getAllPostsByApprenti(@RequestParam String email){

        return postService.getAllPostsByApprenti(email);

    }



    @GetMapping(path="/formateur/posts")
    public List<Post> getAllPostsByFormateur(@RequestParam String email){

        return postService.getAllPostsByFormateur(email);

    }
    private String getCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String email = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("email")) {
                    email = cookie.getValue();
                    break;
                }
            }
        }
        return email;
    }

    @GetMapping("/utilisateur")//récupérer l'utilisateur courant
    public Utilisateur getCurrentUser(HttpServletRequest request){
        String email = getCookie(request);
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElse(null);
        return utilisateur;
    }

    @GetMapping("/isapprenti")//vérifier est ce que l'utilisateur est un apprenti
    public Boolean isApprenti(HttpServletRequest request){
        Utilisateur utilisateur = getCurrentUser(request);
        if(utilisateur instanceof Apprenti){
            return true;
        }
        return false;
    }

    @PostMapping("/formateur/post/validate")
    public Boolean validatePostByFormateur(@RequestBody ValidatePostByFormateur v)
    {
        return validationService.validatePostByFormateur(v);
    }

    @GetMapping("/apprenti/post/formateurs")
    public List<FormateurResponse> getFormateursByPost(@RequestParam Long postId)
    {
        return validationService.getFormateursByPost(postId);
    }

    @PostMapping("/apprenti/post/validate")
    public Boolean validatePostByApprenti(@RequestParam Long postId, @RequestParam String emailFormateur)
    {
        return validationService.validatePostByApprenti(postId,emailFormateur);
    }


    @GetMapping("/apprenti/search")
    public List<FormateurResponseByKeyword> searchFormateursByKeyword(@RequestParam String keyword){
        return userService.searchFormateursByKeyword(keyword);

    }

    @GetMapping("/apprenti/formateurs")
    public List<FormateurResponseByKeyword> getAllFormateurs(){

        return userService.getAllFormateurs();
    }

    @PostMapping("/user/image")
    public void telechargerImageProfil(@RequestParam Long id, @RequestParam("image") MultipartFile image) throws IOException {
        userService.telechargerImageProfil(id, image);
    }

    @GetMapping("/user/image")
    public ResponseEntity<byte[]> recupererImageProfil(@RequestParam Long id) {
        byte[] image = userService.recupererImageProfil(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @PutMapping("/user/image")
    public void modifierImageProfil(@RequestParam Long id, @RequestParam("image") MultipartFile image) throws IOException {
        userService.modifierImageProfil(id, image);
    }



}
