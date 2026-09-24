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
    path: '**',
    component: NotFound
  }

];