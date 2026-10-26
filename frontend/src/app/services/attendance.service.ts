import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = 'https://gym-management-3v55.onrender.com/api/attendance';;
  constructor(private http: HttpClient) { }
  private getHeaders() {

    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

  }
  getAttendanceHistory(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/history`,
      this.getHeaders()
    );
  }

  getAllAttendance(): Observable<any> {

    return this.http.get(

      this.apiUrl,

      this.getHeaders()

    );

  }
  updateAttendance(id: string, data: any): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.getHeaders()

    );

  }
  deleteAttendance(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.getHeaders()

    );

  }

}
