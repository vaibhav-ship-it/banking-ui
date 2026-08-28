import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  
  transferUrl : string = `${APP_CONFIG.API_BASE_URL}/transfer`;

  constructor(private http: HttpClient) {
    
  }

  transfer(transferData : any) : Observable<String> {
    return this.http.post<String>(this.transferUrl, transferData);
  }
}
