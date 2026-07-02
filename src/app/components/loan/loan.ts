import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loan.html',
  styleUrl: './loan.css',
})
export class Loan implements OnInit  {
  loanForm!: FormGroup;
  loanStatus: string = '';
  loanStyle: string = '';

  constructor(private fb: FormBuilder, private loanService: LoanService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(100000)]],
      purpose: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(255)]
      ]
    });
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      const loanRequest = this.loanForm.value;
      console.log('Loan Request Submitted:', loanRequest);

      // TODO: Call backend API (Spring Boot endpoint) here
      this.loanService.submitLoanRequest(loanRequest).subscribe({
        next:(data : string) => {
          console.log(data);
          this.loanStatus = data['message'];
          this.loanStyle = 'success';
          console.log(this.loanStatus);
          this.cd.detectChanges();
          //console.log(data);
        },
        error: (err) => {
          this.loanStatus = err.error;
          this.loanStyle = 'error';
          console.log(err);
          this.cd.detectChanges();
        }
      })
    }
  }
}
