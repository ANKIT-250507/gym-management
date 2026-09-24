import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-dashboard-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-alerts.html',
  styleUrl: './dashboard-alerts.css'
})
export class DashboardAlerts implements OnInit {

  alerts = {
    expiredMemberships: 0,
    lowStockProducts: 0,
    todayAttendance: 0,
    totalNotifications: 0
  };

  loading = true;

  constructor(
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {

    this.reportService.getDashboardReport().subscribe({

      next: (res: any) => {

        this.alerts = {
          expiredMemberships: res.expiredMemberships || 0,
          lowStockProducts: res.lowStockProducts || 0,
          todayAttendance: res.todayAttendance || 0,
          totalNotifications: res.totalNotifications || 0
        };

        this.loading = false;
      },

      error: (err) => {

        console.error('Dashboard Alerts Error:', err);

        this.loading = false;
      }

    });

  }

}