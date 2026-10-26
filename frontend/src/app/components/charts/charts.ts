import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { DashboardService } from '../../services/dashboard.service';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charts.html',
  styleUrl: './charts.css'
})
export class Charts implements AfterViewInit, OnDestroy {

  membersChart?: Chart;
  revenueChart?: Chart;

  loading = true;
  errorMessage = '';

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngAfterViewInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.dashboardService.getChartData().subscribe({

      next: (res: any) => {
        const labels = res.labels || [];

        this.membersChart = new Chart('membersChart', {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'New Members',
              data: res.membersGrowth || [],
              backgroundColor: '#3867f5',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });

        this.revenueChart = new Chart('revenueChart', {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Revenue (₹)',
              data: res.monthlyRevenue || [],
              backgroundColor: '#e63950',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        this.loading = false;
      },

      error: (err) => {
        console.error('Chart API Error:', err);
        this.errorMessage =
          err.error?.message || 'Unable to load chart data.';
        this.loading = false;
      }

    });
  }

  ngOnDestroy(): void {
    this.membersChart?.destroy();
    this.revenueChart?.destroy();
  }
}
