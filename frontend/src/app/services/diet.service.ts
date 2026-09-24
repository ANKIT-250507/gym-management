import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  private apiUrl = 'http://localhost:3000/api/diet';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }

  getDiets(): Observable<any> {
    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );
  }

  getMyDiet(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my`,
      this.getHeaders()
    );
  }

  getMemberDiet(memberId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/member/${memberId}`,
      this.getHeaders()
    );
  }

  createDiet(data: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      data,
      this.getHeaders()
    );
  }

  updateDiet(id: string, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getHeaders()
    );
  }

  deleteDiet(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }
}