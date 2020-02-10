import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {UserAuthModel} from "../auth/userAuthModel";
import {User} from './models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';


const COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAuthModel: UserAuthModel;
  // userEmail: string;

  constructor(private fireStore: AngularFirestore) { }

  private addUpdate(user: User) {
    return this.fireStore.collection(COLLECTION)
      .doc(user.email).set(user);
  }

  addUser(user: User) {
    return of(this.addUpdate(user));
  }

  getUser(email: string): Observable<User>{
    return this.fireStore.collection(COLLECTION).doc(email).get()
      .pipe(map(d => d.data() as User));
  }

  getUsers(): Observable<User[]> {
    return this.fireStore.collection<User>(COLLECTION).valueChanges();
  }

  getUserEmail() {
    this.userAuthModel = JSON.parse(window.localStorage.getItem('userData'));
    return  this.userAuthModel.email;

  }
}

