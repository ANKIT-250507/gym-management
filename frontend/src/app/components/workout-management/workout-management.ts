import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './workout-management.html',
  styleUrl: './workout-management.css'
})
export class WorkoutManagement implements OnInit {

  workouts: any[] = [];

  loading = true;

  showModal = false;

  editing = false;

  selectedId = "";

  newWorkout = {

    member: "",

    workoutName: "",

    day: "Monday",

    exercises: [

      {

        exerciseName: "",

        sets: 3,

        reps: 10,

        restTime: 60

      }

    ]

  };

  constructor(
    private workoutService: WorkoutService
  ) { }

  ngOnInit(): void {

    this.loadWorkouts();

  }

  loadWorkouts() {

    this.loading = true;

    this.workoutService.getAllWorkouts().subscribe({

      next: (res: any) => {

        this.workouts = res.data;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  addWorkout() {

    if (this.editing) {

      this.workoutService.updateWorkout(

        this.selectedId,

        this.newWorkout

      ).subscribe({

        next: () => {

          alert("Workout Updated Successfully");

          this.showModal = false;

          this.editing = false;

          this.loadWorkouts();

        },

        error: (err) => {

          console.error(err);

        }

      });

      return;

    }

    this.workoutService.addWorkout(this.newWorkout).subscribe({

      next: () => {

        alert("Workout Added Successfully");

        this.showModal = false;

        this.loadWorkouts();

        this.resetForm();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  editWorkout(workout: any) {

    this.editing = true;

    this.selectedId = workout._id;

    this.newWorkout = {

      member: workout.member?._id,

      workoutName: workout.workoutName,

      day: workout.day,

      exercises: workout.exercises

    };

    this.showModal = true;

  }

  deleteWorkout(id: string) {

    if (!confirm("Delete Workout?")) return;

    this.workoutService.deleteWorkout(id).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.loadWorkouts();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  resetForm() {

    this.newWorkout = {

      member: "",

      workoutName: "",

      day: "Monday",

      exercises: [

        {

          exerciseName: "",

          sets: 3,

          reps: 10,

          restTime: 60

        }

      ]

    };

    this.editing = false;

    this.selectedId = "";

  }

}