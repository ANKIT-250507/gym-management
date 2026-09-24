import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-recent-members',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './recent-members.html',
  styleUrl: './recent-members.css'
})
export class RecentMembers implements OnInit {

  members: any[] = [];

  loading = true;

  constructor(
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.loadRecentMembers();
  }

  loadRecentMembers() {

    this.reportService.getRecentMembers().subscribe({

      next: (res: any) => {

        this.members = res.members;

        this.loading = false;

      },

      error: (err) => {

        console.error('Recent Members Error:', err);

        this.loading = false;

      }

    });

  }

}