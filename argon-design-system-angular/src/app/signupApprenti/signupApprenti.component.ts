// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from '../../services/user.service';



// @Component({
//     selector: 'app-signup',
//     templateUrl: './signup.component.html',
//     styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent implements OnInit {
//     test : Date = new Date();
//     focus;
//     focus1;
//     focus2;

//     inscriptionForm: FormGroup;
//     errorMessage: string;


//     constructor() {}

//     ngOnInit() {}
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Apprenti } from '../../entities/apprenti';
import { Formateur } from '../../entities/formateur';
import { Post } from '../../entities/post';
import { Utilisateur } from '../../entities/utilisateur';

@Component({
selector: 'app-signupApprenti',
templateUrl: './signupApprenti.component.html',
styleUrls: ['./signupApprenti.component.css']
})
export class SignupApprentiComponent implements OnInit  {
// nom: string;
// prenom:string;
// password: string;
// email: string;
// telephone:string;
// posts: Post[];
// role:string;

userFormGroup! : FormGroup;
errorMessage: any;
apprenti!  : Apprenti; 

isRegistrationSuccessful = false;

constructor(private fb: FormBuilder,
            private userService: UserService) { 
                this.apprenti={
                    // posts : undefined,
                     nom:"",
                     prenom:"",
                     password :"",
                     email:"",
                     telephone:""
                   }
            }


    ngOnInit(): void {
        this.userFormGroup=this.fb.group({
         nom : this.fb.control(""),
         prenom : this.fb.control(""),
        email : this.fb.control(""),
        password : this.fb.control(""),
        telephone: this.fb.control(""),
    });
}
    
    saveApprenti(){
        console.log(`les informations de cet utilisateur : ${this.userFormGroup.value.nom}`)
    
         this.apprenti.nom=this.userFormGroup.value.nom;
         this.apprenti.prenom=this.userFormGroup.value.prenom;
        this.apprenti.password=this.userFormGroup.value.password;
        this.apprenti.email=this.userFormGroup.value.email;
        this.apprenti.telephone=this.userFormGroup.value.telephone;
        this.userService.saveApprenti(this.apprenti).subscribe({
          next:(user)=>{
            console.log(`l'utilisateur enregistré est : ${JSON.stringify(user)} `)
             alert("Your registration is successful")
                // Une fois l'inscription réussie, affichez la notification de succès
                this.isRegistrationSuccessful = true;

          },
          error : (err)=>{
        console.log(err);
        this.errorMessage = err;
      }
          
        })
        
      }



    }

    

// onSubmit(form: NgForm) {
// const apprenti: Apprenti = {
// id: 0,
// prenom: this.prenom,
// nom: this.nom,
// password: this.password,
// email: this.email,
// telephone: this.telephone,
// posts: [],
// role: this.role,
// //role:'' 
// //role: this.role
// };
// this.userService.saveApprenti(apprenti).subscribe(
//     (result) => {
//         console.log(this.userService.isApprenti());
//     console.log('Apprenti enregistré avec succès', result);
//     // Rediriger vers la page de connexion
//     },
//     (error) => {
        
//     console.error('Erreur lors de l\'enregistrement de lapprenti', error);
//     }
//     );

