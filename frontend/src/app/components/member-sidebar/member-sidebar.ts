import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-member-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './member-sidebar.html',
  styleUrl: './member-sidebar.css'
})
export class MemberSidebar {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}