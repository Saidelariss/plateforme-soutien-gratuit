// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private loggedInUserEmail = new BehaviorSubject<string>(null);
//   loggedInUserEmail$ = this.loggedInUserEmail.asObservable();

//   constructor() { }

//   setLoggedInUserEmail(email: string) {
//     this.loggedInUserEmail.next(email);
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, map, pipe } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:8080';
//   loggedInUserEmail$: any;

//   constructor(private http: HttpClient) { }

//   login(username: string, password: string): Observable<any> {
//     // Appel de l'API pour la vérification des informations d'identification
//     const body = { username: username, password: password };
//     return this.http.post<any>(`${this.baseUrl}/login`, body);
      
//   }
// }



