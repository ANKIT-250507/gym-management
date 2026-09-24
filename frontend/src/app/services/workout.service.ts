import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private apiUrl = "http://localhost:3000/api/workout";

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

  getAllWorkouts(): Observable<any> {

    return this.http.get(

      this.apiUrl,

      this.getHeaders()

    );

  }

  addWorkout(data: any): Observable<any> {
    
    return this.http.post(

      `${this.apiUrl}/create`,

      data,

      this.getHeaders()

    );

  }

  updateWorkout(id: string, data: any): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.getHeaders()

    );

  }

  deleteWorkout(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.getHeaders()

    );

  }

}