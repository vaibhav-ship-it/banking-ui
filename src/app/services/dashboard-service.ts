import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Transaction } from '../classes/transaction';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  accountNoUrl : string = `${APP_CONFIG.API_BASE_URL}/loggedInUserAccountNo`;
  currentBalanceUrl : string = `${APP_CONFIG.API_BASE_URL}/getBalance`;
  transactionHistoryUrl : string = `${APP_CONFIG.API_BASE_URL}/getStatement`;

  constructor(private http : HttpClient)  {

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
