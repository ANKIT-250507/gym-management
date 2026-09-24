import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'app-trainer-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './trainer-management.html',
  styleUrl: './trainer-management.css'
})
export class TrainerManagement implements OnInit {

  members: any[] = [];

  workouts: any[] = [];

  loading = true;

  activeTab = "members";

  constructor(
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {

    this.loadMembers();

    this.loadWorkouts();

  }

  loadMembers() {

    this.trainerService.getMembers().subscribe({

      next: (res: any) => {

        this.members = res.members;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  loadWorkouts() {

    this.trainerService.getWorkouts().subscribe({

      next: (res: any) => {

        this.workouts = res.workouts;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  showMembers() {

    this.activeTab = "members";

  }

  showWorkouts() {

    this.activeTab = "workouts";

  }

}