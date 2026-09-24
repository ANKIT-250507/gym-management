import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private apiUrl = "http://localhost:3000/api/trainer";

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

  getMembers(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/members`,

      this.getHeaders()

    );

  }

  getWorkouts(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/workouts`,

      this.getHeaders()

    );

  }

}