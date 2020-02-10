import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Category} from "../models/category.model";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

const COLLECTION = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private fireStore: AngularFirestore) { }

  private addUpdate(category: Category) {
    return this.fireStore.collection(COLLECTION)
      .doc(category.id).set(category);
  }

  getCategory(email: string): Observable<Category>{
    return this.fireStore.collection(COLLECTION).doc(email).get()
      .pipe(map(d => d.data() as Category));
  }

  getCategories(email: string): Observable<Category[]>{
    return this.fireStore.collection<Category>(COLLECTION).valueChanges()
      .pipe(map(d => d.filter(e => e.email === email)));
  }

  addUpdateCategory(category: Category) {
    return of(this.addUpdate(category));
  }

}
