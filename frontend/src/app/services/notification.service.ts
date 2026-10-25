import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = "https://gym-management-3v55.onrender.com/api/notifications";

  constructor(
    private http: HttpClient
  ) { }

  private getHeaders() {

    return {

      headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`

      }

    };

  }

  getNotifications(): Observable<any> {

    return this.http.get(

      this.apiUrl,

      this.getHeaders()

    );

  }

  addNotification(data: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create`,

      data,

      this.getHeaders()

    );

  }

  deleteNotification(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.getHeaders()

    );

  }

}