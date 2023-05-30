import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Competence } from '../../entities/competence';
import { Post } from '../../entities/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Apprenti } from 'src/entities/apprenti';
import { HttpErrorResponse } from '@angular/common/http';
import { PostResponse } from 'src/entities/PostResponse';
import { FormateurResponse } from 'src/entities/FormateursResponse';

@Component({
  selector: 'app-home',
  templateUrl: './profileApprenti.component.html',
  styleUrls: ['./profileApprenti.component.css']
})
export class ProfileApprentiComponent implements OnInit {



  searchForm : FormGroup;

  searchTerm: string;
  searchResults: FormateurResponse[] = [];


  postForm: FormGroup;
  apprenti: Apprenti;
  // posts: Post[]=[];
  posts: PostResponse[];
  selectedCompetence: string;
  competence : string;
  competences: Competence[] = [
    {id:1, nom: 'programmation informatique', formateurs: [], posts:[]}, 
    {id:3, nom: 'math', formateurs: [], posts:[]},
    {id:2, nom: 'physique', formateurs: [], posts:[]},
    {id:4, nom: 'marketing et vente', formateurs: [], posts:[]},
    {id:5, nom: 'analyse de données', formateurs: [], posts:[]},
    {id:6, nom: 'langues étrangères', formateurs: [], posts:[]},
    
  ];

    formateursPost:{email:string,telephone:string}[][]=[]

    DetailsFormateur:Boolean=false;

    acceptedFormateur:string;


  // postService: PostService;
  // formBuilder: FormBuilder;

  // constructor(private postService: PostService) { }
  constructor(private fb: FormBuilder,
              public authService: UserService,
              public postService : PostService ) {
    this.postForm = fb.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required],
      selectedCompetence: ['', Validators.required],
    });
    // this.competence="java";
    // console.log(`l'email = ${localStorage.getItem('username')}`)
    // console.log(`competence selectionnée = ${this.selectedCompetence}`)
  }

  onOptionSelected(selectedValue: string) {
    this.selectedCompetence = selectedValue;
    console.log('Option sélectionnée :', this.selectedCompetence);
    // Faites ce que vous voulez avec l'option sélectionnée
  }


   //DBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
   ngOnInit(): void {
    this.authService.getAllFormateurs().subscribe({
      next:(data)=>{
        this.searchResults = data;
      }
    })
    // this.getPosts();
    this.postForm=this.fb.group({
      titre : this.fb.control(""),
      contenu : this.fb.control("")
      // selectedCompetence:this.fb.control("")

      })

      this.searchForm=this.fb.group({
        keyword : this.fb.control(""),
      
      })


      this.getPosts();
      // console.log(`competence selectionnée = ${this.selectedCompetence}`)

      
  }

  searchByUsername() {
    console.log(this.searchForm.value.keyword);

    this.authService.searchFormateursByKeyword(this.searchForm.value.keyword).subscribe({
      next:(data)=>{
        console.log(JSON.stringify(data))
        this.searchResults=data;
      }
    })
    // Effectuer la logique de recherche ici, en utilisant le terme de recherche (this.searchTerm)
    // et mettre à jour les résultats de recherche (this.searchResults)
    // Exemple fictif :
    
  }

  addPost(){
    this.postService.savePost(this.postForm.value.titre,this.postForm.value.contenu,this.authService.authenticatedUser.username,this.selectedCompetence)
      .subscribe({
        next:(post)=>{
          console.log(`ce post a été ajoué avec succès : ${post}`)
          this.getPosts();
        }
      })
    
  }


  validatePostByApprenti(postId:number,apprentiEmail:string){
    
  }
  

  // ngOnInit() {
  //   this.postForm = this.formBuilder.group({
  //     titre: ['', Validators.required],
  //     contenu: ['', Validators.required],
      
  //   });
  //   // getAllPostsByApprenti(email)
  // }

  // onAddPost(form: NgForm) {
  //   const titre = form.value['titre'];
  //   const contenu = form.value['contenu'];
  //   const competence = form.value['competence'];
  //   const apprenti: Apprenti = { ...this.apprenti, posts: [] }; // Création d'une instance de Apprenti avec une propriété posts vide
  //   const post: Post = {
  //     id: 0,
  //     titre: titre,
  //     contenu: contenu,
  //     datePublication: new Date(),
  //     apprenti: apprenti,
  //     validations: [],
  //     competence: competence
  //   };
  //   this.postService.savePost(post, this.apprenti.email, competence).subscribe(
  //     (result: Post) => {
  //       this.posts.unshift(result);
  //       form.reset();
  //     },
  //     (error) => console.error(error)
  //   );
  // }


  getFormateursByPost(postId:number){
    this.postService.getFormateursByPost(postId).subscribe({
      next:(response)=>{
          this.formateursPost[postId]=response;
      }, 
      error:(error)=>{
        console.log(error)
      }
    })
  }

  getPosts(): void{
    this.postService.getAllPostsByApprenti(this.authService.authenticatedUser.username).subscribe(
      (response) => {
        console.log(JSON.stringify(response))
        this.posts=response;
        for(let post of this.posts){
        this.getFormateursByPost(post.id);
        }

        // this.posts = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  afficherDetailsFormateur(email:string){
    this.acceptedFormateur=email;
    this.DetailsFormateur=true;
  }

  // public onAddPost(addFor: NgForm): void {
  //   document.getElementById('add-abonne-form')?.click();
  //   this.postService.savePost(addFor.value, this.apprenti.email, this.selectedCompetence).subscribe(
  //     (response: Post) => {
  //       const apprenti = this.apprenti;
  //       this.getPosts();
  //       addFor.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addFor.reset();
  //     }
  //   );
  // }
  
}
