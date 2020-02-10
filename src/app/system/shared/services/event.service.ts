import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {EventModel} from "../models/event.model";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

const COLLECTION = 'events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private fireStore: AngularFirestore) { }

  private addUpdate(event: EventModel) {
    return this.fireStore.collection(COLLECTION)
      .doc(event.id).set(event);
  }

  addEvent(event: EventModel) {
    return of(this.addUpdate(event));
  }

  getEvent(id: string): Observable<EventModel> {
    return this.fireStore.collection(COLLECTION).doc(id).get()
      .pipe(map(d => d.data() as EventModel));
  }

  getEvents(email: string): Observable<EventModel[]>{
    return this.fireStore.collection<EventModel>(COLLECTION).valueChanges()
      .pipe(map(d => d.filter(e => e.email === email)));
  }
}
