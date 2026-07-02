import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Transaction } from '../classes/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  accountNoUrl : string = "http://localhost:9000/loggedInUserAccountNo";
  currentBalanceUrl : string = "http://localhost:9000/getBalance";
  transactionHistoryUrl : string = "http://localhost:9000/getStatement";

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
