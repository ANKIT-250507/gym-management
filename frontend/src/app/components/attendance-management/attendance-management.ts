
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-management.html',
  styleUrl: './attendance-management.css'
})
export class AttendanceManagement implements OnInit {

  attendance: any[] = [];
  loading = true;
  showEditModal = false;
  selectedAttendanceId = '';
  editData = { status: 'Present' };

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.loading = true;

    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        this.attendance = Array.isArray(res)
          ? res
          : res.attendance || res.data || [];

        this.loading = false;
      },
      error: (err) => {
        console.error('Attendance load error:', err);
        this.attendance = [];
        this.loading = false;
      }
    });
  }

  editAttendance(item: any): void {
    this.selectedAttendanceId = item._id;
    this.editData.status = item.status || 'Present';
    this.showEditModal = true;
  }

  updateAttendance(): void {
    if (!this.selectedAttendanceId) return;

    this.attendanceService
      .updateAttendance(this.selectedAttendanceId, this.editData)
      .subscribe({
        next: () => {
          alert('Attendance updated successfully!');
          this.showEditModal = false;
          this.loadAttendance();
        },
        error: (err) => {
          console.error('Update attendance error:', err);
          alert(err.error?.message || 'Attendance update failed');
        }
      });
  }

  deleteAttendance(id: string): void {
    if (!confirm('Are you sure you want to delete this attendance?')) {
      return;
    }

    this.attendanceService.deleteAttendance(id).subscribe({
      next: () => {
        alert('Attendance deleted successfully!');
        this.loadAttendance();
      },
      error: (err) => {
        console.error('Delete attendance error:', err);
        alert(err.error?.message || 'Attendance delete failed');
      }
    });
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedAttendanceId = '';
    this.editData = { status: 'Present' };
  }
}
