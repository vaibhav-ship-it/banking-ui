import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationResponse } from '../classes/registration-response';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  apiUrl : string = `${APP_CONFIG.API_BASE_URL}/register/users`;

  constructor(private httpClient : HttpClient)  {

  }

  register(registerFormData : any) : Observable<RegistrationResponse> {
    return this.httpClient.post<RegistrationResponse>(this.apiUrl, registerFormData);
  }
}
