import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-member-workout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-workout.html',
  styleUrl: './member-workout.css'
})
export class MemberWorkout implements OnInit {

  workouts: any[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts() {

    this.loading = true;
    this.errorMessage = '';

    this.authService.getMemberWorkout().subscribe({

      next: (res: any) => {

        console.log('Workout Response:', res);

        this.workouts = res.data || [];

        this.loading = false;

      },

      error: (err) => {

        console.error('Workout Error:', err);

        this.loading = false;

        this.errorMessage =
          err.error?.message ||
          'Unable to load workout plan.';

      }

    });

  }

  completeWorkout(id: string) {

  const confirmComplete = confirm(
    'Are you sure you completed this workout?'
  );

  if (!confirmComplete) {
    return;
  }

  this.authService.completeMemberWorkout(id).subscribe({

    next: (res: any) => {

      console.log('Workout Completed:', res);

      alert('Workout marked as completed! 💪');

      this.loadWorkouts();

    },

    error: (err) => {

      console.error('Complete Workout Error:', err);

      alert(
        err.error?.message ||
        'Unable to complete workout.'
      );

    }

  });

}

  refreshWorkout() {
    this.loadWorkouts();
  }

}