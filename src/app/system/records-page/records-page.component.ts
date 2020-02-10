import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {UserService} from '../../shared/user.service';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  categoriesUser: Category[] = [];
  isLoaded = false;
  userEmail: string;

  constructor(
    private categoriesService: CategoriesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
    this.sub1 = this.categoriesService.getCategories(this.userEmail)
      .subscribe(cat => {
        this.categoriesUser = cat;
        this.isLoaded = true;
      })
  }

  categoryWasEdited(category: Category) {
    this.sub2 = this.categoriesService.addUpdateCategory({
      email: category.email,
      name: category.name,
      capacity: category.capacity,
      id: category.id,
      type: category.type
    })
      .subscribe(() => {
          this.categoriesUser = [];
        }
      );
  }

  ngOnDestroy(): void {
    if(this.sub1) {
      this.sub1.unsubscribe();
    }

    if(this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
