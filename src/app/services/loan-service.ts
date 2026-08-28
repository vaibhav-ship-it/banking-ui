import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class LoanService {

  loanUrl : string = `${APP_CONFIG.API_BASE_URL}/loan`;
  constructor(private http : HttpClient)  {

  }

  submitLoanRequest(loanData : any) : Observable<string>  {
    return this.http.post<string>(this.loanUrl, loanData);
  }
}
