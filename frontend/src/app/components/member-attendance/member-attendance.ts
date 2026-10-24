
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-member-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-attendance.html',
  styleUrl: './member-attendance.css'
})
export class MemberAttendance implements OnInit {
  private apiUrl = 'http://localhost:3000/api/attendance';

  attendance: any[] = [];
  todayAttendance: any = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient) { }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  ngOnInit(): void {
    this.loadAttendance();
  }


  loadAttendance(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<any>(`${this.apiUrl}/history`, {
      headers: this.headers
    }).subscribe({
      next: (res) => {
        this.attendance = Array.isArray(res)
          ? res
          : res.attendance || res.history || res.records || [];

        const today = new Date().toDateString();

        this.todayAttendance = this.attendance.find((item: any) => {
          const attendanceDate = item.date || item.checkIn;
          return attendanceDate &&
            new Date(attendanceDate).toDateString() === today;
        }) || null;

        this.loading = false;
      },
      error: (err) => {
        console.error('Attendance history error:', err);
        this.errorMessage =
          err.error?.message || 'Unable to load attendance history.';
        this.loading = false;
      }
    });
  }


  get totalPresent(): number {
    return this.attendance.filter(
      item => item.status?.toLowerCase() === 'present'
    ).length;
  }

  get totalAbsent(): number {
    return this.attendance.filter(
      item => item.status?.toLowerCase() === 'absent'
    ).length;
  }

  get attendancePercentage(): number {
    if (!this.attendance.length) return 0;

    return Math.round(
      (this.totalPresent / this.attendance.length) * 100
    );
  }

  get hasCheckedInToday(): boolean {
    return !!this.todayAttendance?.checkIn;
  }

  get hasCheckedOutToday(): boolean {
    return !!this.todayAttendance?.checkOut;
  }

  checkIn(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post(`${this.apiUrl}/checkin`, {}, {
      headers: this.headers
    }).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Check-in successful!';
        this.loadAttendance();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Check-in failed.';
      }
    });
  }

  checkOut(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.http.put(`${this.apiUrl}/checkout`, {}, {
      headers: this.headers
    }).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Check-out successful!';
        this.loadAttendance();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Check-out failed.';
      }
    });
  }

  refreshAttendance(): void {
    this.loadAttendance();
  }
}
