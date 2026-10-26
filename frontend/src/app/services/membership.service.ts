import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private apiUrl = 'https://gym-management-3v55.onrender.com/api/membership';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }

  getMemberships(): Observable<any> {
    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );
  }

  createMembership(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create`,
      data,
      this.getHeaders()
    );
  }

  updateMembership(id: string, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getHeaders()
    );
  }

  renewMembership(id: string, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/renew`,
      data,
      this.getHeaders()
    );
  }

  getExpiredMemberships(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/expired`,
      this.getHeaders()
    );
  }

  deleteMembership(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }

  getMembers(): Observable<any> {
  return this.http.get(
    'https://gym-management-3v55.onrender.com/api/trainer/members',
    this.getHeaders()
  );
}

}