import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bill} from "../shared/models/bill.model";
import {Category} from "../shared/models/category.model";
import {combineLatest, Subscription} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventService} from "../shared/services/event.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: EventModel[] = [];
  userEmail: string;

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
    this.sub1 = combineLatest(
      this.billService.getBill(this.userEmail),
      this.categoriesService.getCategories(this.userEmail),
      this.eventsService.getEvents(this.userEmail)
    ).subscribe((data: [Bill, Category[], EventModel[]]) => {
      this.bill = data[0];
      this.categories = data[1].filter(e => e.type === 'outcome');
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events
      .filter(e => e.category === cat.name && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' :  percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }


}
