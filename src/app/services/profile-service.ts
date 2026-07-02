import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../classes/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  fetchProfileUrl : string = 'http://localhost:9000/profile/user';
  updateProfileUrl : string = 'http://localhost:9000/profile/user'

  constructor(private http: HttpClient) {

  }

  fetchProfile() : Observable<UserModel> {
    return this.http.get<UserModel>(this.fetchProfileUrl);
  }

  updateProfile(formData : any) : Observable<UserModel> {
    return this.http.put<UserModel>(this.updateProfileUrl, formData);
  }
}
