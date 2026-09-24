import { Component } from '@angular/core';

import { DashboardCards } from '../../components/dashboard-cards/dashboard-cards';
import { RecentMembers } from '../../components/recent-members/recent-members';
import { QuickActions } from '../../components/quick-actions/quick-actions';
import { DashboardAlerts } from '../../components/dashboard-alerts/dashboard-alerts';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    DashboardCards,
    RecentMembers,
    QuickActions,
    DashboardAlerts
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}