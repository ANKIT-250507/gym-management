
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-fitness',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-fitness.html',
  styleUrl: './member-fitness.css'
})
export class MemberFitness {
  height = 0;
  weight = 0;

  bmi: number | null = null;
  category = '';
  suggestion = '';
  errorMessage = '';

  calculateBMI(): void {
    this.errorMessage = '';

    if (
      !this.height || !this.weight ||
      this.height <= 0 || this.weight <= 0
    ) {
      this.errorMessage = 'Please enter a valid height and weight.';
      this.bmi = null;
      return;
    }

    const heightInMeters = this.height / 100;
    this.bmi = Number(
      (this.weight / (heightInMeters * heightInMeters)).toFixed(1)
    );

    if (this.bmi < 18.5) {
      this.category = 'Underweight';
      this.suggestion =
        'Focus on balanced meals, adequate protein and gradual strength training. Consider professional advice if you are concerned about your weight.';
    } else if (this.bmi < 25) {
      this.category = 'Normal Weight';
      this.suggestion =
        'Maintain balanced nutrition, regular exercise, strength training and adequate sleep.';
    } else if (this.bmi < 30) {
      this.category = 'Overweight';
      this.suggestion =
        'Build a consistent routine with enjoyable cardio, strength training and balanced meals. BMI alone cannot determine your health.';
    } else {
      this.category = 'Obesity Range';
      this.suggestion =
        'Consider discussing your fitness goals with a qualified healthcare professional and build a sustainable activity and nutrition plan.';
    }
  }

  get indicatorPosition(): number {
    if (this.bmi === null) return 0;

    // Map BMI 15–40 onto the indicator from 0% to 100%.
    return Math.max(0, Math.min(100, ((this.bmi - 15) / 25) * 100));
  }

  reset(): void {
    this.height = 0;
    this.weight = 0;
    this.bmi = null;
    this.category = '';
    this.suggestion = '';
    this.errorMessage = '';
  }
}
