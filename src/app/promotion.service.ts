import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from './models/promotion.model'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = 'http://localhost:4000/api/promotions';

  constructor(private http: HttpClient) { }

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  addPromotion(promotion: Promotion): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, promotion);
  }


  deletePromotion(Id: string) {
    return this.http.delete(`http://localhost:4000/api/promotions/delete/${Id}`);
  }
}