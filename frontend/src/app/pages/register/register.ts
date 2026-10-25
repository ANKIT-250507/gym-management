
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    if (!this.name.trim() || !this.email.trim() || !this.password) {
      alert('Please fill all fields');
      return;
    }

    const data = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      role: 'member'
    };

    this.authService.register(data).subscribe({
      next: () => {
        alert('Registration Successful');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }
}
