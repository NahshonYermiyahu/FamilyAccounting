import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Category} from "../../shared/models/category.model";
import {CategoriesService} from "../../shared/services/categories.service";
import {NgForm} from "@angular/forms";
import {UserService} from "../../../shared/user.service";
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  sub: Subscription;
  userEmail: string;
  category:Category;
  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];
  message: Message;

  constructor(
    private categoriesService: CategoriesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
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
    const email = this.userEmail;
    const id = new Date().getTime().toString();
    const type = form.value.type;
    this.category = new Category(email, name, capacity,type,
      id);
    this.categoriesService.addUpdateCategory({
      email: email,
      name: name,
      capacity: capacity,
      type: type,
      id: id
    })
      .subscribe(() => {
        this.message.text = 'Category added successfully';
        setTimeout(() => this.message.text = '', 5000);
        form.reset();
        form.form.patchValue({capacity: 0});
      });
  }
}
