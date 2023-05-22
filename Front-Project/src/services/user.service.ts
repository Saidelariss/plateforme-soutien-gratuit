import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Apprenti } from '../entities/apprenti';
import { Formateur } from '../entities/formateur';
import { Utilisateur } from '../entities/utilisateur';
import { environment } from 'src/environments/environment';
import { Route, Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class UserService {

private apiServerUrl = environment.apiBaseUrl;

 authenticatedUser : {username:string,nom:string,prenom:string,roles:string[]}
    
constructor(private http: HttpClient, private router : Router) { }

// Méthode d'authentification de l'utilisateur
// login(email: string, password: string): Observable<Utilisateur> {
//     const url = `${this.apiServerUrl}/login?email=${email}&password=${password}`;
//     return this.http.get<Utilisateur>(url);
//   }

login(email:string, password:string): Observable<{username:string,nom:string,prenom:string,roles:string[]}>{
    const credentials = { username: email, password: password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');


   return this.http.post<{username:string,nom:string,prenom:string,roles:string[]}>('http://localhost:8080/api/authenticate', credentials, { headers: headers });
    

}

public setThisUserToLocalStorage():Observable<Boolean>{
    localStorage.setItem("authUser",JSON.stringify({username:this.authenticatedUser.username,nom:this.authenticatedUser.nom,prenom:this.authenticatedUser.prenom,roles:this.authenticatedUser.roles}));
    return of(true);
   }

   public hasRole(role : string) : boolean{
    return this.authenticatedUser!.roles.includes(role);
   }

   public isAuthenticated(){
    return this.authenticatedUser!=undefined;
   }

   public logout(): Observable<boolean> {
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");
    this.router.navigateByUrl("/landing");
    return of(true)
   }





// Méthode pour enregistrer un apprenti
saveApprenti(apprenti: Apprenti): Observable<Apprenti> {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');   
    //const url = `${this.apiServerUrl}/apprenti`; //A changer
    return this.http.post<Apprenti>('http://localhost:8080/api/register/apprenti', apprenti, { headers: headers });
}

// Méthode pour enregistrer un formateur
saveFormateur(formateur: Formateur): Observable<Formateur> {
const url = `${this.apiServerUrl}/apprenti`; //A changer
return this.http.post<Formateur>(url, formateur);
}

//RestAPIController a changer
getCurrentUser(): Observable<Utilisateur>{
    const url = `${this.apiServerUrl}/utilisateur`;
    return this.http.get<Utilisateur>(url);
}

//verifier si c'est un apprenti ou pas restapicontroller a changer
isApprenti(): Observable<Boolean>{
    const url = `${this.apiServerUrl}/isapprenti`;
    return this.http.get<Boolean>(url);
}


// isApprenti(): Observable<boolean> {
//     const url = `${this.apiServerUrl}/utilisateur`;
//     return this.http.get<Utilisateur>(url).pipe(map(user => user.isApprenti));
//   }

// isApprenti(): Observable<boolean> {
//     const url = `${this.apiServerUrl}/isapprenti`;
//     return this.http.get<boolean>(url);
//   }
  
}
