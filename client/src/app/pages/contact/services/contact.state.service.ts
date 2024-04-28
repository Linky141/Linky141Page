import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ContactData } from "../models/contact.model";

const initialState = {
  contact: [] as ContactData[],
};

type AboutStateValue = typeof initialState;

@Injectable({ providedIn: "root" })
export class ContactStateService {
  private state$ = new BehaviorSubject(initialState);
  value$ = this.state$.asObservable();

  setContact(data: ContactData[]) {
    this.state$.next({
      contact: data,
    });
  }

  updateContact(data: ContactData) {
    const updatedData = this.state$.value.contact.map((val) => {
      return val.id === data.id ? data : val;
    });

    this.state$.next({
      contact: updatedData,
    });
  }

  removeContact(id: ContactData["id"]) {
    const updatedData = this.state$.value.contact.filter((res) => {
      return res.id !== id;
    });

    this.state$.next({
      contact: updatedData,
    });
  }

  addContact(contact: ContactData) {
    this.state$.next({
      contact: [...this.state$.value.contact, contact],
    });
  }
}
