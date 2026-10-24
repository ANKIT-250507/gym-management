import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Admin } from './pages/admin/admin';
import { Trainer } from './pages/trainer/trainer';
import { Member } from './pages/member/member';
import { NotFound } from './pages/not-found/not-found';
import { AttendanceManagement } from './components/attendance-management/attendance-management';
import { MembershipManagement } from './components/membership-management/membership-management';
import { ProductManagement } from './components/product-management/product-management';
import { ReportManagement } from './components/report-management/report-management';
import { WorkoutManagement } from './components/workout-management/workout-management';
import { DietManagement } from './components/diet-management/diet-management';
import { NotificationManagement } from './components/notification-management/notification-management';
import { TrainerManagement } from './components/trainer-management/trainer-management';
import { Settings } from './components/settings/settings';
import { MemberDashboard } from './components/member-dashboard/member-dashboard';
import { MemberWorkout } from './components/member-workout/member-workout';
import { MemberDiet } from './components/member-diet/member-diet';
import { MemberAttendance } from './components/member-attendance/member-attendance';
import { MemberFitness } from './components/member-fitness/member-fitness';
import { MemberMembership } from './components/member-membership/member-membership';
import { MemberNotifications } from './components/member-notifications/member-notifications';
import { MemberManagement } from './components/member-management/member-management';
import { MemberProducts } from './components/member-products/member-products';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'admin',
    component: Admin
  },
  {
    path: 'trainer',
    component: Trainer
  },
  {
    path: 'member',
    component: Member
  },
  {
    path: 'members',
    component: MemberManagement
  },
  {
    path: 'attendance',
    component: AttendanceManagement
  },
  {
    path: 'membership',
    component: MembershipManagement
  },
  {
    path: 'products',
    component: ProductManagement
  },
  {
    path: 'reports',
    component: ReportManagement
  },
  {
    path: 'workout',
    component: WorkoutManagement
  },
  {
    path: 'diet',
    component: DietManagement
  },
  {
    path: 'notifications',
    component: NotificationManagement
  },
  {
    path: 'trainers',
    component: TrainerManagement
  },
  {
    path: 'settings',
    component: Settings
  },
  {
    path: 'member-dashboard',
    component: MemberDashboard
  },
  {
    path: 'member-workout',
    component: MemberWorkout
  },

  {
    path: 'member-diet',
    component: MemberDiet
  },

  {
    path: 'member-attendance',
    component: MemberAttendance
  },

  {
    path: 'member-fitness',
    component: MemberFitness
  },

  {
    path: 'member-membership',
    component: MemberMembership
  },

  {
    path: 'member-notifications',
    component: MemberNotifications
  },

  {
    path: 'member-products',
    component: MemberProducts
  },

  {
    path: '**',
    component: NotFound
  }



];