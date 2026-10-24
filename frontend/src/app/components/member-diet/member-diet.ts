import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DietService } from '../../services/diet.service';

@Component({
  selector: 'app-member-diet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-diet.html',
  styleUrl: './member-diet.css'
})
export class MemberDiet implements OnInit {

  dietPlans: any[] = [];

  loading = false;
  errorMessage = '';

  constructor(private dietService: DietService) {}

  ngOnInit(): void {
    this.loadDietPlans();
  }

  loadDietPlans(): void {

    this.loading = true;
    this.errorMessage = '';

    this.dietService.getMyDiet().subscribe({

      next: (response) => {

        this.dietPlans = response.diets || [];

        this.loading = false;

      },

      error: (error) => {

        console.error('Diet loading error:', error);

        this.errorMessage =
          error.error?.message || 'Unable to load diet plan';

        this.loading = false;

      }

    });

  }

  getMealIcon(mealType: string): string {

    switch (mealType) {
      case 'Breakfast':
        return '🍳';

      case 'Lunch':
        return '🍱';

      case 'Dinner':
        return '🍗';

      case 'Snack':
        return '🥜';

      default:
        return '🥗';
    }

  }

}