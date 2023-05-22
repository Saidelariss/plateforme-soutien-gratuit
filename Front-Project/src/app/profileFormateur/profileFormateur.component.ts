import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Utilisateur } from '../../entities/utilisateur';
import { Formateur } from '../../entities/formateur';
import { Post } from '../../entities/post';
import { Competence } from '../../entities/competence';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-profileFormateur',
    templateUrl: './profileFormateur.component.html',
    styleUrls: ['./profileFormateur.component.css']
})

export class ProfileFormateurComponent implements OnInit {

    user : Utilisateur;
    posts:Post[]=[];
    format : Formateur;

    constructor(public authService: UserService, private postService: PostService) { }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(user => this.user = user);
        // Récupération des posts correspondants à l'utilisateur
        this.getPosts();
    }

    // getPosts() {
        
    //     this.format = this.user as Formateur; //new same as ap problem
    //     let competences: Competence[] = this.format.competences;
    //     this.postService.getAllPostsByFormateur(this.user.email).subscribe(posts => {
    //     this.posts = posts.filter(post => {
    //     return competences.some(comp => comp.nom == post.competence.nom);
    //     });
    //     });
        
    // }

    getPosts(): void{
        this.postService.getAllPostsByFormateur(this.authService.authenticatedUser.username).subscribe(
          (response) => {
            console.log(JSON.stringify(response))
            this.posts=response;
            // this.posts = response
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    
    
    
        

}
