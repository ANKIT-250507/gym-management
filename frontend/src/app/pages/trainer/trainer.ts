
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TrainerSidebar } from '../../components/trainer-sidebar/trainer-sidebar';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TrainerSidebar],
  templateUrl: './trainer.html',
  styleUrl: './trainer.css',
})
export class Trainer implements OnInit {
  members: any[] = [];
  workouts: any[] = [];

  loadingMembers = true;
  loadingWorkouts = true;
  submitting = false;

  membersError = '';
  workoutsError = '';
  message = '';
  errorMessage = '';

  showForm = false;

  private apiUrl = 'https://gym-management-3v55.onrender.com/api';

  form = {
    member: '',
    workoutName: '',
    day: 'Monday',
    exercises: [
      {
        exerciseName: '',
        sets: 3,
        reps: 12,
        restTime: 60
      }
    ]
  };

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMembers();
    this.loadWorkouts();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  loadMembers(): void {
    this.loadingMembers = true;
    this.membersError = '';

    this.http.get<any>(`${this.apiUrl}/trainer/members`, {
      headers: this.getHeaders()
    }).subscribe({
      next: (response) => {
        this.members = response.members || [];
        this.loadingMembers = false;
      },
      error: (error) => {
        this.membersError =
          error.error?.message || 'Members load nahi hue.';
        this.loadingMembers = false;
        console.error(error);
      }
    });
  }

  loadWorkouts(): void {
    this.loadingWorkouts = true;
    this.workoutsError = '';

    this.http.get<any>(`${this.apiUrl}/trainer/workouts`, {
      headers: this.getHeaders()
    }).subscribe({
      next: (response) => {
        this.workouts = response.workouts || [];
        this.loadingWorkouts = false;
      },
      error: (error) => {
        this.workoutsError =
          error.error?.message || 'Workouts load nahi hue.';
        this.loadingWorkouts = false;
        console.error(error);
      }
    });
  }

  addExercise(): void {
    this.form.exercises.push({
      exerciseName: '',
      sets: 3,
      reps: 12,
      restTime: 60
    });
  }

  removeExercise(index: number): void {
    if (this.form.exercises.length > 1) {
      this.form.exercises.splice(index, 1);
    }
  }

  openForm(): void {
    this.message = '';
    this.errorMessage = '';
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.form = {
      member: '',
      workoutName: '',
      day: 'Monday',
      exercises: [
        {
          exerciseName: '',
          sets: 3,
          reps: 12,
          restTime: 60
        }
      ]
    };
  }

  createWorkout(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.form.member) {
      this.errorMessage = 'Please select a member.';
      return;
    }

    if (!this.form.workoutName.trim()) {
      this.errorMessage = 'Please enter a workout name.';
      return;
    }

    if (this.form.exercises.some(exercise =>
      !exercise.exerciseName.trim() ||
      Number(exercise.sets) < 1 ||
      Number(exercise.reps) < 1 ||
      Number(exercise.restTime) < 0
    )) {
      this.errorMessage =
        'Enter valid details for every exercise.';
      return;
    }

    const payload = {
      member: this.form.member,
      workoutName: this.form.workoutName.trim(),
      day: this.form.day,
      exercises: this.form.exercises.map(exercise => ({
        exerciseName: exercise.exerciseName.trim(),
        sets: Number(exercise.sets),
        reps: Number(exercise.reps),
        restTime: Number(exercise.restTime)
      }))
    };

    this.submitting = true;

    this.http.post<any>(`${this.apiUrl}/workout/create`, payload, {
      headers: this.getHeaders()
    }).subscribe({
      next: (response) => {
        this.message =
          response.message || 'Workout assigned successfully!';

        this.submitting = false;
        this.showForm = false;
        this.resetForm();
        this.loadWorkouts();
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Workout assign nahi hua.';
        this.submitting = false;
        console.error(error);
      }
    });
  }

  get memberCount(): number {
    return this.members.length;
  }

  get workoutCount(): number {
    return this.workouts.length;
  }

  getMemberName(member: any): string {
    return member?.name || 'Unknown Member';
  }

  getPendingCount(): number {
    return this.workouts.filter(w => w.status === 'Pending').length;
  }
}
