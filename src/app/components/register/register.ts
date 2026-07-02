import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from '../../services/registration-service';
import { RegistrationResponse } from '../../classes/registration-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  registerStatus = '';
  msgStyle = '';
  registerError = '';
  constructor(private fb: FormBuilder, private registrationService : RegistrationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{10}')
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
          Validators.email
        ]
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern('[a-zA-Z0-9!@#$]{8,16}')
        ]
      ]
    });
  }

  // Easy access to form controls in template
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('Form is invalid, please correct errors.');
      return;
    }

    // If valid, you can send data to backend
    console.log('Registration data:', this.registerForm.value);

    // Example: call your registration service here
    this.registrationService.register(this.registerForm.value).subscribe({
      next: (data: RegistrationResponse) => {
        this.registerStatus = "Registration Successful !!!";
        this.msgStyle = "success";
        console.log(this.registerStatus);
        console.log(data);
        this.cd.detectChanges();
      },
      error: (err) => {
        this.registerStatus = "Registration Failed !!!";
        this.msgStyle = "error";
        this.registerError = err.error.message;
        console.log(this.registerStatus);
        console.log(err);
        this.cd.detectChanges();
      }
    });	
  }

}
