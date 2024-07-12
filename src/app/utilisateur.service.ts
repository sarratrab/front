import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://127.0.0.1:4000/user';



  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }


  deleteUser(userId: string) {
    return this.http.delete(`http://127.0.0.1:4000/user/delete/${userId}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${user._id}`, user);  // Assurez-vous que l'utilisateur a une propriété _id
  }
  addUtilisateur(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/utilisateurs`, user);
  }
}



