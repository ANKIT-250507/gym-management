import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: (res: any) => {

        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);

        if (res.user.role === "admin") {
          this.router.navigate(['/admin']);
        }
        else if (res.user.role === "trainer") {
          this.router.navigate(['/trainer']);
        }
        else {
          this.router.navigate(['/member-dashboard']);
        }

      },

      error: (err) => {
        alert(err.error.message);
      }

    });

  }

}