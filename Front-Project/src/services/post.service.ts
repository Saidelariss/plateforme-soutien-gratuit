import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../entities/post';
import { Apprenti } from 'src/entities/apprenti';
import { Competence } from '../entities/competence';
import { environment } from 'src/environments/environment';
import { PostResponse } from 'src/entities/PostResponse';



@Injectable({
providedIn: 'root'
})
export class PostService {

     posts: PostResponse[];

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    savePost(titre:string,contenu:string,email:string,competence:string):Observable<Boolean>{
        console.log(`email : ${email}  et competence  : ${competence} `)
        const post = { titre: titre, contenu: contenu, emailApprenti:email,competenceName:competence };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    return this.http.post<Boolean>('http://localhost:8080/api/apprenti/post', post, { headers: headers });
    
    

    }

    // savePost(post: Post, email: string, competence: Competence): Observable<Post> {
    // const url = `${this.apiServerUrl}/apprenti/posts`;
    // return this.http.post<Post>(url,post);
    // }

    getAllPostsByApprenti(email: string): Observable<PostResponse[]> {
    const url = `http://localhost:8080/api/apprenti/posts?email=${email}`;
     return this.http.get<PostResponse[]>(url);
    }

    getAllPostsByFormateur(email: string): Observable<Post[]> {
    const url = `http://localhost:8080/api/formateur/posts?email=${email}`;
    return this.http.get<Post[]>(url);
    }


    ValidatePostByFormateur(postId:number,emailFormateur:string):Observable<Boolean>{
        const postValidateByFormateur = { postId:postId ,emailFormateur:emailFormateur };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<Boolean>("http://localhost:8080/api/formateur/post/validate",postValidateByFormateur,{ headers: headers });
    }

    getFormateursByPost(postId:number):Observable<{email:string,telephone:string}[]>{
        return this.http.get<{email:string,telephone:string,nom:string,prenom:string}[]>(`http://localhost:8080/api/apprenti/post/formateurs?postId=${postId}`);
    }

    validatePostByApprenit(postId:number):Observable<Boolean>{
        const postValidateByApprenti = { postId:postId  };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<Boolean>("http://localhost:8080/api/apprenti/post/validate",postValidateByApprenti,{ headers: headers });
    }
}