import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs";
import {EventService} from "../../shared/services/event.service";
import {BillService} from "../../shared/services/bill.service";
import {Message} from "../../../shared/models/message.model";
import {UserService} from "../../../shared/user.service";
import {mergeMap} from "rxjs/operators";
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  message: Message;
  userEmail: string;

  constructor(
    private eventService: EventService,
    private billService: BillService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.userEmail = this.userService.getUserEmail();
  }

  private showMessage(text: string) {
    this.message.text = text;
    setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const id = new Date().getTime().toString();
    const email = this.userEmail;
    let amount = form.value.amount;
    const description = form.value.description;
    const category = form.value.category;
    const type = form.value.type;
    let date:string = moment().format('DD.MM.YYYY HH:mm:ss');
    if(amount < 0) {
      amount *= -1;
    }
    this.sub1 = this.billService.getBill(email)
      .subscribe(bill => {
        let value = 0;
        if(type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`There are not enough funds on the account.
             You are lacking ${amount - bill.value}`);
            return;
          } else {
            if (bill === undefined) {
              value = amount;
            } else {
              value = bill.value - amount;
            }

          }
        }else {
          if (bill === undefined) {
            value = amount;
          } else {
            value = bill.value + amount;
          }
        }
        this.sub2 = this.billService.addUpdateBill({
          value: value,
          // currency: bill.currency,
          email: email
        })
          .pipe(mergeMap(() => this.eventService.addEvent({
            type: type,
            amount: amount,
            category: category,
            date: date,
            description: description,
            id: id,
            email: email
          })))
          .subscribe(() => {
            this.message = new Message('success', '');
            this.message.text = 'Event added successfully';
            setTimeout(() => this.message.text = '', 5000);
            form.setValue({
              amount: 0,
              description: ' ',
              category: ' ',
              type: 'outcome'
            });
          });
      });
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
  }
}
