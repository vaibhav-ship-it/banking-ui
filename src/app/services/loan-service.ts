import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {

  loanUrl : string = 'http://localhost:9000/loan';
  constructor(private http : HttpClient)  {

  }

  submitLoanRequest(loanData : any) : Observable<string>  {
    return this.http.post<string>(this.loanUrl, loanData);
  }
}
