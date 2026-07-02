import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../classes/transaction';
import { DashboardService } from '../../services/dashboard-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  transactions : Transaction[];
  balance : number;
  accountNo : string;

  constructor(private dashboardService : DashboardService, private authService : AuthService,
    private cd: ChangeDetectorRef
  ) {
    
  }
  /*constructor(private authService : AuthService)  {

  }*/

  ngOnInit(): void {
    console.log('Inside Dashboard component onOnInit() method')
    this.dashboardService.fetchAccountNo().subscribe({
      next: (data : string) => {
        console.log('Inside next method of fetchAccountNo');
        this.accountNo = data;
        console.log(this.accountNo);
        this.cd.detectChanges();
      }
    });

    this.dashboardService.fetchCurrentBalance().subscribe({
      next: (data : number) => {
        console.log('Inside next method of fetchCurrentBalance');
        this.balance = data;
        console.log(this.balance);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
    
    this.dashboardService.fetchLast7DaysTransactions().subscribe({
      next:(data : Transaction[]) => {
        console.log('Inside next method of fetchLast7DaysTransactions');
        this.transactions = data;
        console.log("Last 7 days transactions: ");
        console.log(this.transactions);
        this.cd.detectChanges();
      },
      error:(err) =>  {
        console.log(err);
      }
    });
  }

  logout() : void {
    this.authService.logout()
  }

}
