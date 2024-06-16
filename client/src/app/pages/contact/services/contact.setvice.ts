import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs";
import {
  ContactAddPayload,
  ContactApiService,
  ContactUpdatePayload,
} from "./contact.api.service";
import { ContactStateService } from "./contact.state.service";

@Injectable({ providedIn: "root" })
export class ContactService {
  private httpService = inject(ContactApiService);
  private state = inject(ContactStateService);

  getAll() {
    return this.httpService.GetContacts().pipe(
      tap((res) => {
        if (res.body) {
          this.state.setContact(res.body);
        }
      })
    );
  }

  update(id: string, payload: ContactUpdatePayload) {
    return this.httpService.UpdateContact(id, payload).pipe(
      tap((res) => {
        this.state.updateContact(res);
      })
    );
  }

  delete(id: string) {
    return this.httpService.DeleteContact(id).pipe(
      tap(() => {
        this.state.removeContact(id);
      })
    );
  }

  add(payload: ContactAddPayload) {
    return this.httpService.AddNewContact(payload).pipe(
      tap((task) => {
        this.state.addContact(task);
      })
    );
  }
}
