import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-management.html',
  styleUrl: './report-management.css'
})
export class ReportManagement implements OnInit {

  dashboard:any={};

  revenue:any={};

  stock:any={};

  attendance:any={};

  constructor(
    private reportService: ReportService
  ){}

  ngOnInit(): void {

    this.loadReports();

  }

  loadReports(){

    this.reportService.getDashboardReport().subscribe({
      next:(res:any)=>{
        this.dashboard=res;
      }
    });

    this.reportService.getRevenueReport().subscribe({
      next:(res:any)=>{
        this.revenue=res;
      }
    });

    this.reportService.getStockReport().subscribe({
      next:(res:any)=>{
        this.stock=res;
      }
    });

    this.reportService.getAttendanceReport().subscribe({
      next:(res:any)=>{
        this.attendance=res;
      }
    });

  }

}