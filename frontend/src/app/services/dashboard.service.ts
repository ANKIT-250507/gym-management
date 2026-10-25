import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://gym-management-3v55.onrender.com/api/dashboard';

  constructor(private http: HttpClient) {}

  getRecentMembers() {

    return this.http.get<any>(
      `${this.apiUrl}/recent-members`
    );

  }

}