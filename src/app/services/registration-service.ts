import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationResponse } from '../classes/registration-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  apiUrl : string = 'http://localhost:9000/register/users';

  constructor(private httpClient : HttpClient)  {

  }

  register(registerFormData : any) : Observable<RegistrationResponse> {
    return this.httpClient.post<RegistrationResponse>(this.apiUrl, registerFormData);
  }
}
