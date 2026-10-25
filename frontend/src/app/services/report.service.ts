import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = "https://gym-management-3v55.onrender.com/api/reports";

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
  }

  getDashboardReport(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/dashboard`,
      this.getHeaders()
    );
  }

  getRevenueReport(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/revenue`,
      this.getHeaders()
    );
  }

  getAttendanceReport(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/attendance`,
      this.getHeaders()
    );
  }

  getStockReport(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/stock`,
      this.getHeaders()
    );
  }

  getRecentMembers(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/recent-members`,
      this.getHeaders()
    );
  }

}