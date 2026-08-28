import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../classes/user-model';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  fetchProfileUrl : string = `${APP_CONFIG.API_BASE_URL}/profile/user`;
  updateProfileUrl : string = `${APP_CONFIG.API_BASE_URL}/profile/user`;

  constructor(private http: HttpClient) {

  }

  fetchProfile() : Observable<UserModel> {
    return this.http.get<UserModel>(this.fetchProfileUrl);
  }

  updateProfile(formData : any) : Observable<UserModel> {
    return this.http.put<UserModel>(this.updateProfileUrl, formData);
  }
}
