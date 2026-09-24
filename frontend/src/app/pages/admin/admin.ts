import { Component } from '@angular/core';

import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';
import { DashboardCards } from '../../components/dashboard-cards/dashboard-cards';
import { RecentMembers } from '../../components/recent-members/recent-members';
import { Charts } from '../../components/charts/charts';
import { MemberManagement } from '../../components/member-management/member-management';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    Sidebar,
    Navbar,
    DashboardCards,
    RecentMembers,
    Charts,
    MemberManagement,
    Dashboard
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}