import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DietService } from '../../services/diet.service';
import { MembershipService } from '../../services/membership.service';

@Component({
  selector: 'app-diet-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './diet-management.html',
  styleUrl: './diet-management.css'
})
export class DietManagement implements OnInit {

  diets: any[] = [];
  members: any[] = [];

  showModal = false;
  editing = false;

  selectedId = '';

  loading = false;

  dietForm = {
    member: '',
    mealType: 'Breakfast',
    foodItems: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    day: 'Monday',
    notes: ''
  };

  constructor(
    private dietService: DietService,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {

    this.loadDiets();
    this.loadMembers();

  }


  // ===============================
  // LOAD DIETS
  // ===============================

  loadDiets(): void {

    this.dietService.getDiets().subscribe({

      next: (res: any) => {

        this.diets = res.diets || [];

      },

      error: (err) => {

        console.error('Diet Error:', err);

      }

    });

  }


  // ===============================
  // LOAD MEMBERS
  // ===============================

  loadMembers(): void {

    this.membershipService.getMembers().subscribe({

      next: (res: any) => {

        this.members =
          res.members ||
          res.users ||
          [];

      },

      error: (err) => {

        console.error('Members Error:', err);

      }

    });

  }


  // ===============================
  // OPEN ADD
  // ===============================

  openAddModal(): void {

    this.editing = false;
    this.selectedId = '';

    this.resetForm();

    this.showModal = true;

  }


  // ===============================
  // EDIT
  // ===============================

  editDiet(diet: any): void {

    this.editing = true;

    this.selectedId = diet._id;

    this.dietForm = {

      member: diet.member?._id || diet.member || '',

      mealType: diet.mealType || 'Breakfast',

      foodItems: diet.foodItems || '',

      calories: diet.calories || 0,

      protein: diet.protein || 0,

      carbs: diet.carbs || 0,

      fats: diet.fats || 0,

      day: diet.day || 'Monday',

      notes: diet.notes || ''

    };

    this.showModal = true;

  }


  // ===============================
  // SAVE
  // ===============================

  saveDiet(): void {

    if (
      !this.dietForm.member ||
      !this.dietForm.foodItems
    ) {

      alert('Please fill required fields');

      return;

    }

    this.loading = true;


    if (this.editing) {

      this.dietService
        .updateDiet(
          this.selectedId,
          this.dietForm
        )
        .subscribe({

          next: () => {

            alert('Diet Updated Successfully');

            this.closeModal();

            this.loadDiets();

          },

          error: (err) => {

            console.error(err);

            alert(
              err.error?.message ||
              'Failed to update diet'
            );

            this.loading = false;

          }

        });

    } else {

      this.dietService
        .createDiet(this.dietForm)
        .subscribe({

          next: () => {

            alert('Diet Created Successfully');

            this.closeModal();

            this.loadDiets();

          },

          error: (err) => {

            console.error(err);

            alert(
              err.error?.message ||
              'Failed to create diet'
            );

            this.loading = false;

          }

        });

    }

  }


  // ===============================
  // DELETE
  // ===============================

  deleteDiet(id: string): void {

    if (
      !confirm(
        'Are you sure you want to delete this diet?'
      )
    ) {
      return;
    }

    this.dietService
      .deleteDiet(id)
      .subscribe({

        next: () => {

          alert('Diet Deleted Successfully');

          this.loadDiets();

        },

        error: (err) => {

          console.error(err);

          alert(
            err.error?.message ||
            'Failed to delete diet'
          );

        }

      });

  }


  // ===============================
  // CLOSE
  // ===============================

  closeModal(): void {

    this.showModal = false;

    this.loading = false;

    this.editing = false;

  }


  // ===============================
  // RESET
  // ===============================

  resetForm(): void {

    this.dietForm = {

      member: '',

      mealType: 'Breakfast',

      foodItems: '',

      calories: 0,

      protein: 0,

      carbs: 0,

      fats: 0,

      day: 'Monday',

      notes: ''

    };

  }

}