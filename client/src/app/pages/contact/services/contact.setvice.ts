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
    return this.httpService.getAll().pipe(
      tap((res) => {
        if (res.body) {
          this.state.setContact(res.body);
        }
      })
    );
  }

  update(id: number, payload: ContactUpdatePayload) {
    return this.httpService.update(id, payload).pipe(
      tap((res) => {
        this.state.updateContact(res);
      })
    );
  }

  delete(taskId: number) {
    return this.httpService.delete(taskId).pipe(
      tap(() => {
        this.state.removeContact(taskId);
      })
    );
  }

  add(payload: ContactAddPayload) {
    return this.httpService.add(payload).pipe(
      tap((task) => {
        this.state.addContact(task);
      })
    );
  }
}
