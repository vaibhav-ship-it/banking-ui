import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../classes/login-response';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Transaction } from '../classes/transaction';
import { APP_CONFIG } from '../app.constants';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl : string = `${APP_CONFIG.API_BASE_URL}/login`;
  private token : string;
  accountNoUrl : string = `${APP_CONFIG.API_BASE_URL}/loggedInUserAccountNo`;
  currentBalanceUrl : string = `${APP_CONFIG.API_BASE_URL}/getBalance`;
  transactionHistoryUrl : string = `${APP_CONFIG.API_BASE_URL}/getStatement`;
  balance : number = 0;
  transactions : Transaction[] = [];

  constructor(private http: HttpClient, private router: Router) {
    
  }

  login(credentials: any) : Observable<Map<string,string>> {
    console.log(credentials);
    return this.http.post<Map<string,string>>(this.loginUrl, credentials);
  }

  saveToken(token: string)  {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout()  {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }

  fetchAccountNo() : Observable<string>  {
    return this.http.get<string>(this.accountNoUrl);
  }
  fetchCurrentBalance() : Observable<number>  {
    return this.http.get<number>(this.currentBalanceUrl);
  }
  fetchLast7DaysTransactions() : Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionHistoryUrl);
  }
}
