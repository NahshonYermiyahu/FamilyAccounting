import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserAuthModel} from '../../auth/userAuthModel';
import {Bill} from '../shared/models/bill.model';
import {BillService} from '../shared/services/bill.service';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  email= '';
  currency = '';
  value = 0;
  currencyIls: any;
  currencyEur: any;
  bill: Bill = new Bill(this.email,this.value, this.currency);
  isLoaded = false;
  userAuthModel: UserAuthModel;
  userEmail: string;

  constructor(
    private billService: BillService,
    private userService: UserService
  ) { }

  // ngOnInit() {
  //   this.userEmail = this.userService.getUserEmail();
  //     this.sub1 = this.billService.getBill(this.userEmail)
  //       .subscribe(data => {
  //         if(data !== undefined){
  //           this.bill = data;
  //         }
  //         this.sub2 = this.billService.getCurrencyIls()
  //           .subscribe(d => {
  //             this.currencyIls = d;
  //             this.sub3 = this.billService.getCurrencyEur()
  //               .subscribe(e => {
  //                 this.currencyEur = e;
  //                 this.isLoaded = true;
  //               });
  //           });
  //       });
  //
  // }

  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
    this.sub1 = this.billService.getBill(this.userEmail)
      .subscribe(data => {
        if(data !== undefined){
          this.bill = data;
        }
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }

    if(this.sub3) {
      this.sub3.unsubscribe();
    }
  }
}
