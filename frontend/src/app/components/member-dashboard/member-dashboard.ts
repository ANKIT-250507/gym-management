import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MemberWorkout } from '../member-workout/member-workout';
import { MemberSidebar } from '../member-sidebar/member-sidebar';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [FormsModule,MemberWorkout,MemberSidebar],
  templateUrl: './member-dashboard.html',
  styleUrl: './member-dashboard.css'
})
export class MemberDashboard implements OnInit {

  member: any = {};

  loading = true;
  saving = false;

  errorMessage = '';
  successMessage = '';

  editMode = false;

  editProfile: any = {
    name: '',
    phone: '',
    age: null,
    gender: '',
    height: null,
    weight: null,
    goal: '',
    activityLevel: ''
  };

  attendance = 0;
  protein = 0;

  membershipStatus = 'Active';
  membershipExpiry = 'Not Available';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMemberProfile();
  }


  // =========================
  // LOAD PROFILE
  // =========================

  loadMemberProfile() {

    this.loading = true;
    this.errorMessage = '';

    this.authService.getMemberProfile().subscribe({

      next: (res: any) => {

        console.log('Member Profile:', res);

        this.member =
          res.member ||
          res.user ||
          res.data ||
          res;

        this.loading = false;

      },

      error: (err) => {

        console.error('Profile Error:', err);

        this.loading = false;

        if (err.status === 401 || err.status === 403) {

          alert('Session expired. Please login again.');

          this.authService.logout();

          this.router.navigate(['/login']);

        } else {

          this.errorMessage =
            err.error?.message ||
            'Unable to load member profile.';

        }

      }

    });

  }


  // =========================
  // OPEN EDIT PROFILE
  // =========================

  openEditProfile() {

    this.successMessage = '';
    this.errorMessage = '';

    this.editProfile = {

      name: this.member.name || '',

      phone: this.member.phone || '',

      age: this.member.age || null,

      gender: this.member.gender || '',

      height: this.member.height || null,

      weight: this.member.weight || null,

      goal: this.member.goal || '',

      activityLevel: this.member.activityLevel || ''

    };

    this.editMode = true;

  }


  // =========================
  // CANCEL EDIT
  // =========================

  cancelEdit() {

    this.editMode = false;

    this.successMessage = '';
    this.errorMessage = '';

  }


  // =========================
  // SAVE PROFILE
  // =========================

  saveProfile() {

    this.saving = true;

    this.successMessage = '';
    this.errorMessage = '';

    const data = {

      name: this.editProfile.name,

      phone: this.editProfile.phone,

      age: Number(this.editProfile.age),

      gender: this.editProfile.gender,

      height: Number(this.editProfile.height),

      weight: Number(this.editProfile.weight),

      goal: this.editProfile.goal,

      activityLevel: this.editProfile.activityLevel

    };


    this.authService.updateMemberProfile(data).subscribe({

      next: (res: any) => {

        console.log('Profile Updated:', res);

        this.saving = false;

        this.editMode = false;

        this.successMessage =
          'Profile updated successfully!';

        // Get latest data from backend
        this.loadMemberProfile();

      },

      error: (err) => {

        console.error('Update Error:', err);

        this.saving = false;

        this.errorMessage =
          err.error?.message ||
          'Unable to update profile.';

      }

    });

  }


  // =========================
  // LOGOUT
  // =========================

  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}