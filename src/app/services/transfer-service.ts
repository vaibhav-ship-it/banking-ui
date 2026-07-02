import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  
  transferUrl : string = 'http://localhost:9000/transfer'

  constructor(private http: HttpClient) {
    
  }

  transfer(transferData : any) : Observable<String> {
    return this.http.post<String>(this.transferUrl, transferData);
  }
}
