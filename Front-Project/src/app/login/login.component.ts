import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from '../../entities/utilisateur';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string;
  isApprenti: Boolean;
  utilisateur: Utilisateur;

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required]
    // });
  }
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
    email : this.formBuilder.control(""),
    password : this.formBuilder.control(""),
    })
    
  }

  login(){
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
      next:(user)=>{
        user=user
        console.log(`l'utilisateur authentifié est : ${JSON.stringify(user)} `);
        this.authService.authenticatedUser=user;
        console.log(`l'utilisateur authentifié est : ${JSON.stringify(this.authService.authenticatedUser)} `);
        this.authService.setThisUserToLocalStorage();
        if(this.authService.authenticatedUser.roles[0]=="ROLE_Apprenti"){
          this.router.navigateByUrl("/profileApprenti");
        }
        else if(this.authService.authenticatedUser.roles[0]=="ROLE_Formateur"){
          this.router.navigateByUrl("/profileFormateur");
        }
        
      },
    error : (err)=>{
    console.log(err);
    alert("Bad Credentials")
    console.log("Bad Credentials");
    this.errorMessage = err;
  }
    })

  }
  // onSubmit(): void {
  //   const email = this.loginForm.value.email;
  //   const password = this.loginForm.value.password;

  //   // Obtention de l'utilisateur courant
  //   this.authService.getCurrentUser().subscribe(user => {
  //     this.utilisateur = user;

  //     // Vérification si l'utilisateur est un apprenti ou un formateur
  //     this.authService.isApprenti().subscribe(isApprenti => {
  //       this.isApprenti = isApprenti;

  //       // Connexion de l'utilisateur
  //       this.authService.login(email, password).subscribe(
  //         (utilisateur: Utilisateur) => {
  //           console.log('User is logged in', utilisateur);
  //           console.log("eroooooor"+this.authService.isApprenti());
  //           console.log("eroooooor"+this.isApprenti);
  //           if(isApprenti) this.router.navigate(['/profileApprenti']);
  //           else this.router.navigate(['/profileFormateur']);

  //           // Redirection vers la page de profil correspondante
  //           // if(this.utilisateur.role ==="apprenti") {
  //           //   this.router.navigate(['/profileApprenti']);
  //           // } 
  //           // if(this.utilisateur.role ==="formateur")  {
  //           //   //console.log('cest un formateur');
  //           //   this.router.navigate(['/profileFormateur']);
  //           // }
  //         },
  //         (error) => {
  //           console.error('An error occurred', error);
  //           this.errorMessage = 'Invalid email or password';
  //         }
  //       );
  //     });
  //   });
  // }
}
