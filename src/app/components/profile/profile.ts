import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile-service';
import { UserModel } from '../../classes/user-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  userForm!: FormGroup;
  updateStatus: string = '';
  msgStyle: string = '';

  constructor(private fb: FormBuilder, private profileService : ProfileService,
    private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: 0, // hidden field, no validators
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z\\s]{3,50}')
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z\\s]{3,50}')
        ]
      ],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(255)]
      ]
    });
    this.profileService.fetchProfile().subscribe({
      next:(userModel : UserModel)=>{
        this.f['id'].setValue(userModel.id);
        this.f['firstName'].setValue(userModel.firstName);
        this.f['lastName'].setValue(userModel.lastName);
        this.f['mobile'].setValue(userModel.mobile);
        this.f['address'].setValue(userModel.address);
        console.log(userModel);
        
      },
      error:(err)=>{
        console.log("Error fetching user data");
        console.log(err);
        this.updateStatus = 'Error fetching user data';
        this.msgStyle = 'red';
        this.cd.detectChanges();
      }
    })
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userRequest = this.userForm.value;
      console.log('User Request Submitted:', userRequest);

      // TODO: Call backend API (Spring Boot endpoint) here
      this.profileService.updateProfile(userRequest).subscribe({
        next:(userModel : UserModel)=> {
          console.log("Updated Data: ");
          console.log(userModel);
          if(userModel != null) {
            this.updateStatus = 'Profile Updated Successfully !!!';
            this.msgStyle = 'green';
            this.f['firstName'].setValue(userModel.firstName);
            this.f['lastName'].setValue(userModel.lastName);
            this.f['mobile'].setValue(userModel.mobile);
            this.f['address'].setValue(userModel.address);
            this.cd.detectChanges();
          }
        },
        error:(err)=> {
          console.log("error updating profile");
          console.log(err);
          this.updateStatus = 'Error updating profile!';
          this.msgStyle = 'red';
          this.cd.detectChanges();
        }
      })
    }
  }
  
}
