
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-member-membership',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-membership.html',
  styleUrl: './member-membership.css'
})
export class MemberMembership implements OnInit {
  private apiUrl = 'https://gym-management-3v55.onrender.com/api/membership/my';

  membership: any = null;
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMembership();
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  loadMembership(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<any>(this.apiUrl, {
      headers: this.headers
    }).subscribe({
      next: (res) => {
        const data = res?.membership ?? res?.memberships ?? res;
        this.membership = Array.isArray(data) ? data[0] ?? null : data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Membership load error:', err);
        this.errorMessage =
          err.error?.message || 'Unable to load your membership.';
        this.loading = false;
      }
    });
  }

  get isExpired(): boolean {
    if (!this.membership?.expiryDate) return false;

    const expiry = new Date(this.membership.expiryDate);
    expiry.setHours(23, 59, 59, 999);

    return expiry.getTime() < Date.now();
  }

  get remainingDays(): number {
    if (!this.membership?.expiryDate) return 0;

    const expiry = new Date(this.membership.expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Math.max(
      0,
      Math.ceil((expiry.getTime() - today.getTime()) / 86400000)
    );
  }

  get membershipStatus(): string {
    if (this.isExpired) return 'Expired';
    return 'Active';
  }

  get paymentStatus(): string {
    return this.membership?.paymentStatus || 'Pending';
  }

  refresh(): void {
    this.loadMembership();
  }
}
