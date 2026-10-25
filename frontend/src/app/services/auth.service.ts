
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://gym-management-3v55.onrender.com/api';

  private apiUrl = `${this.baseUrl}/auth`;
  private memberApiUrl = `${this.baseUrl}/member`;
  private workoutApiUrl = `${this.baseUrl}/workout`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  getMemberProfile(): Observable<any> {
    return this.http.get(
      `${this.memberApiUrl}/profile`,
      { headers: this.getHeaders() }
    );
  }

  updateMemberProfile(data: any): Observable<any> {
    return this.http.put(
      `${this.memberApiUrl}/profile`,
      data,
      { headers: this.getHeaders() }
    );
  }

  getMemberWorkout(): Observable<any> {
    return this.http.get(
      `${this.workoutApiUrl}/member`,
      { headers: this.getHeaders() }
    );
  }

  completeMemberWorkout(id: string): Observable<any> {
    return this.http.put(
      `${this.workoutApiUrl}/member/${id}/complete`,
      {},
      { headers: this.getHeaders() }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
