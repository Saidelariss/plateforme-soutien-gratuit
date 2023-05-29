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
    approvedPosts : {id:number,approve:Boolean}[]=[];
    postApproved:{id:number,approve:Boolean}={id:null,approve:false}
    user : Utilisateur;
    posts:Post[]=[];
    format : Formateur;
    afficherApprover:Boolean=false;

    approved;Boolean=false;
    // isPostApproved : Boolean=this.postApproved.approve;

    //approvedPost:Boolean

    constructor(public authService: UserService, private postService: PostService) { 
      

    }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(user => this.user = user);
        // Récupération des posts correspondants à l'utilisateur
        this.getPosts();
       
    }

    isPostApproved(id:number){
      let post= this.approvedPosts.find(post => post.id === id);
          
          if (post) {
            if(post.approve==true) return true;
            else return false
            
          } else {
           return false;
          }
    }


    validatePostByFormateur(postId:number,emailFormateur:string){
      this.postService.ValidatePostByFormateur(postId,emailFormateur).subscribe({
        next:(response)=>{
          console.log(`response of accept post ${response}`)
          alert("Approved Post")
         
          this.postApproved = this.approvedPosts.find(post => post.id === postId);
          //pour le premier affichage 
          this.afficherApprover=true;

         
          
          if (this.postApproved) {
            this.postApproved.approve = true;
            
          } else {
            console.log("Post not found in approvedPosts array");
          }

          console.log(`les postsapproved : ${JSON.stringify(this.approvedPosts)}`)

          this.approved= this.isPostApproved(postId);

          // let post = this.posts.find(post => post.id == postId);
          // if (post) {
          //   if (post.formateurs) {
          //     post.formateurs.push(emailFormateur);
          //   } else {
          //     post.formateurs = [emailFormateur];
          //   }
          // }
          // console.log(JSON.stringify(post));
        },
        error:(error)=>{
          console.log(`response of accept postError ${error}`)

        }
      })
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
            for(let post of this.posts){
              this.approvedPosts.push({id:post.id,approve:false})
              
          }
            // this.posts = response
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    
    
    
        

}
