import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { TranslationService } from "../../services/translation.service";
import { ContactService } from "./services/contact.setvice";
import { ContactData } from "../../models/contact.model";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { wait } from "../../utils/wait";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { FormsModule } from "@angular/forms";
import { ContactNewContectComponent } from "./contact.new-contect.component";
import { ContactTableColumnNameComponent } from "./contact.table-column-name.component";
import { ContactTableColumnValueComponent } from "./contact.table-column-value.component";

@Component({
  selector: "app-contact",
  standalone: true,
  template: `
    @if(state.state === listStateValue.SUCCESS){
    <div class="m-5">
      <table mat-table [dataSource]="state.result" class="mat-elevation-z8">
        <ng-container matColumnDef="contactName">
          <th mat-header-cell *matHeaderCellDef class="w-[200px]">
            {{ translationsService.t("contactName") }}
          </th>
          <td mat-cell *matCellDef="let element">
            <app-contact-table-column-name
              [element]="element"
              [editingContact]="editingContact"
              editingContactName="{{ editingContactName }}"
              (editingContactNameEmitter)="handleEditingContactName($event)"
            />
          </td>
        </ng-container>
        <ng-container matColumnDef="contactValue">
          <th mat-header-cell *matHeaderCellDef>
            {{ translationsService.t("contactValue") }}
          </th>
          <td mat-cell *matCellDef="let element">
            <app-contact-table-column-value
              [element]="element"
              [savingEditedContact]="savingEditedContact"
              (setEditModeEmitter)="handleEditModeEmitter($event)"
              editingContactName="{{ editingContactName }}"
              editingContactValue="{{ editingContactValue }}"
              (updateContactEmitter)="handleUpdateContactEmitter($event)"
              credentials="{{ credentials }}"
              [addingNewContact]="addingNewContact"
              [deletingContactId]="deletingContactId"
              [editingContact]="editingContact"
              (deleteContactEmitter)="handleDeleteContactEmitter($event)"
            />
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
    <app-contact-new-contact
      credentials="{{ credentials }}"
      [addingNewContact]="addingNewContact"
      [savingNewContact]="savingNewContact"
      (changeAddNewContactFlag)="changeAddNewContactFlag($event)"
      (addContact)="addContact($event)"
      [deletingContactId]="deletingContactId"
    />
    } @else {
    <app-loading text="{{ translationsService.t('loading') }}" />
    }
  `,
  imports: [
    MatTableModule,
    LoadingPageComponent,
    FormsModule,
    ContactNewContectComponent,
    ContactTableColumnNameComponent,
    ContactTableColumnValueComponent,
  ],
})
export class ContactPageComponent {
  credentials = ""; //todo: remove after add users
  debugDelay = 1000; //todo: remove

  addingNewContact = false;
  savingNewContact = false;

  editingContact = -1;
  editingContactName = "";
  editingContactValue = "";
  savingEditedContact = false;

  deletingContactId = -1;

  contactService = inject(ContactService);
  translationsService = inject(TranslationService);
  state: PageState<ContactData> = { state: LIST_STATE_VALUE.IDLE };
  listStateValue = LIST_STATE_VALUE;

  displayedColumns: string[] = ["contactName", "contactValue"];

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.getAllContactData();
  }

  async getAllContactData(): Promise<void> {
    this.state = { state: LIST_STATE_VALUE.LOADING };
    await wait(this.debugDelay); //todo: remove

    this.contactService.getAll().subscribe({
      next: (res) => {
        this.state = {
          state: LIST_STATE_VALUE.SUCCESS,
          result: res.body!,
        };
      },
      error: (err) => {
        this.state = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }

  async addContact(event: { name: string; value: string }): Promise<void> {
    this.savingNewContact = true;
    await wait(this.debugDelay); //todo: remove
    this.contactService
      .add({ contactName: event.name, contactValue: event.value })
      .subscribe({
        next: (res) => {
          if (this.state.state == LIST_STATE_VALUE.SUCCESS) {
            this.state.result = [...this.state.result, res];
          }
        },
        error: (err) => {
          this.state = {
            state: LIST_STATE_VALUE.ERROR,
            error: err,
          };
        },
      });

    this.savingNewContact = false;
    this.addingNewContact = false;
  }

  async deleteContact(id: number) {
    this.deletingContactId = id;
    await wait(this.debugDelay); //todo: remove
    this.contactService.delete(id).subscribe({
      next: () => {
        if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
          this.state.result = this.state.result.filter((del) => del.id !== id);
        }
      },
      error: (res) => {
        alert(res.message);
      },
    });
    this.deletingContactId = -1;
  }

  async updateContact(id: number, name: string, value: string) {
    this.savingEditedContact = true;
    await wait(this.debugDelay); //todo: remove
    this.contactService
      .update(id, { contactName: name, contactValue: value })
      .subscribe({
        next: (res) => {
          if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
            this.state.result = this.state.result.map((d) => {
              if (d.id === res.id) {
                return res;
              } else {
                return d;
              }
            });
          }
          this.setEditMode(-1, "", "");
          this.savingEditedContact = false;
        },
        error: (res) => {
          alert(res.message);
        },
      });
  }

  handleEditingContactName(newName: string) {
    this.editingContactName = newName;
  }

  handleEditModeEmitter(event: { id: number; name: string; value: string }) {
    this.setEditMode(event.id, event.name, event.value);
  }

  handleUpdateContactEmitter(event: {
    id: number;
    name: string;
    value: string;
  }) {
    this.updateContact(event.id, event.name, event.value);
  }

  handleDeleteContactEmitter(event: { id: number }) {
    this.deleteContact(event.id);
  }

  changeAddNewContactFlag(value: boolean) {
    this.addingNewContact = value;
  }

  setEditMode(id: number, name: string, value: string) {
    this.editingContact = id;
    this.editingContactName = name;
    this.editingContactValue = value;
  }
}
