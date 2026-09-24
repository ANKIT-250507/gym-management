import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './attendance-management.html',
  styleUrl: './attendance-management.css'
})
export class AttendanceManagement implements OnInit {

  attendance: any[] = [];
  loading = true;

  showEditModal = false;
  selectedAttendanceId = "";

  editData = {
    status: "Present"
  };

  constructor(
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance() {

    this.loading = true;

    this.attendanceService.getAllAttendance().subscribe({

      next: (res: any) => {

        this.attendance = res.attendance;
        this.loading = false;

      },

      error: (err) => {

        console.error(err);
        this.loading = false;

      }

    });

  }

  editAttendance(item: any) {

    this.selectedAttendanceId = item._id;

    this.editData = {
      status: item.status
    };

    this.showEditModal = true;

  }

  updateAttendance() {

    this.attendanceService.updateAttendance(
      this.selectedAttendanceId,
      this.editData
    ).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.showEditModal = false;

        this.loadAttendance();

      },

      error: (err) => {

        console.error(err);

        alert(err.error?.message || "Update Failed");

      }

    });

  }

  deleteAttendance(id: string) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this attendance?"
    );

    if (!confirmDelete) return;

    this.attendanceService.deleteAttendance(id).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.loadAttendance();

      },

      error: (err) => {

        console.error(err);

        alert(err.error?.message || "Delete Failed");

      }

    });

  }

}