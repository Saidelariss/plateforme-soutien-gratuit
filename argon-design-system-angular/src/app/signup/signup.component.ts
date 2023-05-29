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

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Apprenti } from '../../entities/apprenti';
import { Formateur } from '../../entities/formateur';
import { Utilisateur } from '../../entities/utilisateur';

@Component({
selector: 'app-signup',
templateUrl: './signup.component.html',
styleUrls: ['./signup.component.css']
})


export class SignupComponent {
nom: string;
prenom:string;
password: string;
email: string;
telephone:string;
role:string;

constructor(private userService: UserService) { }

onSubmit(form: NgForm) {
const user: Utilisateur = {
// id: 0,
prenom: this.prenom,
nom: this.nom,
password: this.password,
email: this.email,
telephone: this.telephone,
// role: this.role
//role:''
//role: this.role
};
if (this.role==="appr") {
const apprenti: Apprenti = {
// id: 0,
prenom: this.prenom,
nom: this.nom,
password: this.password,
email: this.email,
telephone: this.telephone,
posts: [],
// role:this.role,
...user
};
this.userService.saveApprenti(apprenti).subscribe(
(result) => {
console.log('Apprenti enregistré avec succès', result);
console.log(this.userService.isApprenti());
// Rediriger vers la page de connexion
},
(error) => {
console.error('Erreur lors de l\'enregistrement de l\'apprenti', error);
}
);
} else {
const formateur: Formateur = {
id: 0,
prenom: this.prenom,
nom: this.nom,
password: this.password,
email: this.email,
telephone: this.telephone,
role:"formateur",
competences: [],
validations: [],
// role:this.role,
...user
};
this.userService.saveFormateur(formateur).subscribe(
(result) => {
    console.log(this.userService.isApprenti());
console.log('Formateur enregistré avec succès', result);
// Rediriger vers la page de connexion
},
(error) => {
    
console.error('Erreur lors de l\'enregistrement du formateur', error);
}
);
}
}
}