import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {Subscription} from "rxjs";
import {Message} from "../../../shared/models/message.model";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  currentCategoryId: '1';
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  currentCategory = new Category(
    "",
    0
  );
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.name;
    let capacity = form.value.capacity;
    if (capacity < 0) {
      capacity *= -1;
    }
    const id = this.currentCategory.id;
    const email = this.currentCategory.email;
    const type = this.currentCategory.type;
    const category = new Category(name, capacity, type, email, id);
    this.categoriesService.addUpdateCategory({
      name: name,
      capacity: capacity,
      type: type,
      email: email,
      id: id
    }).subscribe(() => {
      this.onCategoryEdit.emit(category);
      this.message.text = 'Category edited successfully';
      setTimeout(() => this.message.text = '', 5000);
      form.reset();
      this.currentCategoryId = '1';
    })
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === this.currentCategoryId);
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }
}
