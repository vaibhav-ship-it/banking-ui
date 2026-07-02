import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Transfer } from './components/transfer/transfer';
import { Loan } from './components/loan/loan';
import { Profile } from './components/profile/profile';
import { Logout } from './components/logout/logout';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard},
  { path: 'transfer', component: Transfer},
  { path: 'loan', component: Loan},
  { path: 'profile', component: Profile},
  { path: 'logout', component: Logout},
  { path: '', redirectTo: '/login', pathMatch: 'full' } // default route
];
