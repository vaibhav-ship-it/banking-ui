import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../classes/transaction';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginError : string = '';

  currentTransactions : Transaction[];
  currentBalance : number;
  currentAccountNo : string;

  constructor(private authService : AuthService, private router: Router,
    private cd: ChangeDetectorRef
  ) {
    
  }
  loginData = {
    username: '',
    password: 'Abcd@1234'
  };

  onSubmit(form: any) {
  if (form.valid) {
    
    this.authService.login(this.loginData).subscribe({
      next: (data : any) => {
        console.log(data);
        this.authService.saveToken(data.token);
        console.log(this.authService.getToken());
        this.loginError = '';
         this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginError = err.error.error;
        console.log(this.loginError);
        console.log('Login failed ', err);
        this.cd.detectChanges();
      }
    });
  }
}}

