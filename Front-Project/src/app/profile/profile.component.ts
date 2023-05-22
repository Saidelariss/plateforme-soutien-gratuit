import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Utilisateur } from '../../entities/utilisateur';
import { Formateur } from '../../entities/formateur';
import { Apprenti } from '../../entities/apprenti';
import { Post } from '../../entities/post';
import { Competence } from '../../entities/competence';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    user : Utilisateur;
    posts:Post[]=[];
    isApprenti: Boolean;

    ap : Apprenti;
    format : Formateur;

    constructor(private authService: UserService, private postService: PostService) { }

    ngOnInit() {
        // Récupération de l'utilisateur connecté
        //this.user = this.authService.getCurrentUser();
        this.authService.getCurrentUser().subscribe(user => this.user = user);
        // Vérification si l'utilisateur est un apprenti ou un formateur
        //this.isApprenti = this.authService.isApprenti();
        this.authService.isApprenti().subscribe(isApprenti => this.isApprenti = isApprenti);
        // Récupération des posts correspondants à l'utilisateur
        this.getPosts();
    }

    getPosts() {
        // Si l'utilisateur est un apprenti, on récupère ses propres posts
        if (this.isApprenti) {
            this.ap=this.user as Apprenti;
        this.postService.getAllPostsByApprenti(this.user.email).subscribe(posts => {
        // this.posts = posts;
        });
        }
        // Sinon, on récupère les posts des autres apprentis dont les compétences correspondent à celles du formateur
        else {
            this.format = this.user as Formateur; //new same as ap problem
        let competences: Competence[] = this.format.competences;
        this.postService.getAllPostsByFormateur(this.user.email).subscribe(posts => {
        this.posts = posts.filter(post => {
        return competences.some(comp => comp.nom == post.competence.nom);
        });
        });
        }
    }
    
    onPostAdded(post: Post) {
        // Si l'utilisateur est un apprenti, on ajoute le post à sa liste de posts
        if (this.isApprenti) {
        this.posts.push(post);
        }
    }
        

}
