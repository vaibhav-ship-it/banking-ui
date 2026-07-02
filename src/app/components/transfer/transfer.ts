import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransferService } from '../../services/transfer-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css',
})
export class Transfer {

  transferForm!: FormGroup;
  transferStatus : string = '';
  msgStyle : string = '';

  constructor(private fb: FormBuilder, private transferService : TransferService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      recipientAccountNo: [''],
      amount: [null],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      const transferRequest = this.transferForm.value;
      console.log('Transfer Request Submitted:', transferRequest);

      // TODO: Call backend API (Spring Boot endpoint) here
      this.transferService.transfer(transferRequest).subscribe({
        next:(transferStatus : string) => {
          this.transferStatus = transferStatus['message'];
          this.msgStyle = 'green';
          console.log(transferStatus);
          this.cd.detectChanges();
        },
        error:(err) =>  {
          this.transferStatus = 'Error processing transfer';
          this.msgStyle = 'red';
          console.log('Error processing transfer');
          console.log(err);
          this.cd.detectChanges();
        }
      })
    }
  }
}
