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
  role = 'member';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(data).subscribe({

      next: () => {

        alert("Registration Successful");
        this.router.navigate(['/']);

      },

      error: (err) => {

        alert(err.error.message);

      }

    });

  }

}