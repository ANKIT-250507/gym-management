import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  private apiUrl = 'https://gym-management-3v55.onrender.com/api/diet';

  constructor(private http: HttpClient) {}

  getMyDiet(): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/my`, {
      headers
    });
  }
}