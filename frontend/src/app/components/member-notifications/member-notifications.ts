
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-member-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-notifications.html',
  styleUrl: './member-notifications.css'
})
export class MemberNotifications implements OnInit {
  private apiUrl = 'https://gym-management-3v55.onrender.com/api/notifications/member';

  notifications: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;
    this.errorMessage = '';

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });

    this.http.get<any>(this.apiUrl, { headers }).subscribe({
      next: (res) => {
        const data = res?.notifications ?? res;
        this.notifications = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Notifications error:', err);
        this.errorMessage =
          err.error?.message || 'Unable to load notifications.';
        this.loading = false;
      }
    });
  }

  get unreadCount(): number {
    return this.notifications.filter(
      n => n.isRead === false || n.isRead == null
    ).length;
  }

  getTitle(notification: any): string {
    return notification.title || notification.subject || 'Gym Notification';
  }

  getMessage(notification: any): string {
    return notification.message || notification.description || '';
  }

  getDate(notification: any): string | Date {
    return notification.createdAt || notification.date || '';
  }
}
