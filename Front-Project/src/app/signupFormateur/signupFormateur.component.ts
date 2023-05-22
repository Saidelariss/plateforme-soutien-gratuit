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
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Apprenti } from '../../entities/apprenti';
import { Formateur } from '../../entities/formateur';
import { Utilisateur } from '../../entities/utilisateur';
import { Competence } from 'src/entities/competence';
import { Validation } from 'src/entities/validation';

@Component({
selector: 'app-signupFormateur',
templateUrl: './signupFormateur.component.html',
styleUrls: ['./signupFormateur.component.css']
})
export class SignupFormateurComponent implements OnInit{

    competences: Competence[] = [
        {id:1, nom: 'java', formateurs: [], posts:[]}, 
        {id:3, nom: 'math', formateurs: [], posts:[]},
        {id:2, nom: 'physique', formateurs: [], posts:[]}];
        userFormGroup:FormGroup;   


nom: string;
prenom:string;
password: string;
email: string;
telephone:string;
// competences: Competence[];
validations: Validation[];
role: string;

    constructor(private userService: UserService,
            private fb : FormBuilder) { }


    ngOnInit(): void {
        this.userFormGroup=this.fb.group({
            nom : this.fb.control(""),
            prenom : this.fb.control(""),
           email : this.fb.control(""),
           password : this.fb.control(""),
           telephone: this.fb.control(""),
           competences: this.fb.array([])
       });
    }

    // get Competences(): FormArray {
    //     return this.userFormGroup.get('competences') as FormArray;
    //   }
      
    //   onCheckboxChange(event: any) {
    //     const competencesArray: FormArray = this.userFormGroup.get('competences') as FormArray;
      
    //     if (event.target.checked) {
    //       competencesArray.push(new FormControl(event.target.value));
    //     } else {
    //       const index = competencesArray.controls.findIndex(x => x.value === event.target.value);
    //       competencesArray.removeAt(index);
    //     }
    //   }
      
    //   onSubmit() {
    //     const selectedCompetences = this.userFormGroup.value.competences;
    //     console.log(selectedCompetences);
    //     // Envoyer selectedCompetences au backend
    //   }



    saveFormateur(){

    }


// onSubmit(form: NgForm) {
 

// const formateurs: Formateur = {
// id: 0,
// prenom: this.prenom,
// nom: this.nom,
// password: this.password,
// email: this.email,
// telephone: this.telephone,
// competences: this.competences,
// //competences: this.competences.nom.push(this.competences),
// validations: [],
// //role:''
// role: this.role ,
// };
// this.userService.saveFormateur(formateurs).subscribe(
//     (result) => {
//         console.log(this.userService.isApprenti());
//     console.log('Formateur enregistré avec succès', result);
//     // Rediriger vers la page de connexion
//     },
//     (error) => {
        
//     console.error('Erreur lors de l\'enregistrement du formateur', error);
//     }
//     );

// }


}