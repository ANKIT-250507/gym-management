import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = "https://gym-management-3v55.onrender.com/api/member";

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem("token");

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getMembers(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/all`,
      this.getHeaders()
    );
  }

  addMember(member: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create`,
      member,
      this.getHeaders()
    );
  }

  addTrainer(trainer: any): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/create-trainer`,
    trainer,
    this.getHeaders()
  );
}

  deleteMember(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }

  updateMember(id: string, member: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      member,
      this.getHeaders()
    );
  }

}