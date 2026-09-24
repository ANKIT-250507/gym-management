import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard-cards.html',
  styleUrl: './dashboard-cards.css'
})
export class DashboardCards implements OnInit {

  dashboard = {
    totalMembers: 0,
    totalProducts: 0,
    totalMemberships: 0,
    totalAttendance: 0
  };

  revenue = 0;

  loading = true;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {

    this.loadDashboard();

    this.loadRevenue();

  }

  loadDashboard() {

    this.reportService.getDashboardReport().subscribe({

      next: (res: any) => {

        this.dashboard = res;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  loadRevenue() {

    this.reportService.getRevenueReport().subscribe({

      next: (res: any) => {

        this.revenue = res.totalRevenue;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}