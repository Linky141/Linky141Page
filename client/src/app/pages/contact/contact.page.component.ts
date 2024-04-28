import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslationService } from "../../services/translation.service";
import { ContactService } from "./services/contact.setvice";
import { ContactData } from "../../models/contact.model";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { wait } from "../../utils/wait";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { ContactUpdatePayload } from "./services/contact.api.service";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";

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
            @if(editingContact !== element.id){
            {{ element.contactName }}
            } @else {
            <mat-form-field class="mx-2 mt-5 w-full">
              <mat-label>{{ translationsService.t("contactName") }}</mat-label>
              <input
                matInput
                placeholder="{{ translationsService.t('email') }}"
                [(ngModel)]="editingContactName"
              />
            </mat-form-field>
            }
          </td>
        </ng-container>
        <ng-container matColumnDef="contactValue">
          <th mat-header-cell *matHeaderCellDef>
            {{ translationsService.t("contactValue") }}
          </th>
          <td mat-cell *matCellDef="let element">
            <div class="flex">
              <div class="flex h-auto items-center">
                @if(editingContact !== element.id){
                {{ element.contactValue }}
                }@else {
                <mat-form-field class="mx-2 mt-5 w-full">
                  <mat-label>{{
                    translationsService.t("contactValue")
                  }}</mat-label>
                  <input
                    matInput
                    placeholder="{{
                      translationsService.t('examplemail@mail.com')
                    }}"
                    [(ngModel)]="editingContactValue"
                  />
                </mat-form-field>
                }
              </div>
              @if(credentials==='admin' && addingNewContact === false){
              <div class="ml-auto">
                @if(editingContact !== element.id){
                <button
                  mat-icon-button
                  class="mx-2"
                  disabled="{{
                    deletingContactId !== -1 || editingContact !== -1
                  }}"
                  (click)="
                    setEditMode(
                      element.id,
                      element.contactName,
                      element.contactValue
                    )
                  "
                >
                  @if(deletingContactId===-1 && editingContact === -1){
                  <mat-icon class="text-blue-600">edit</mat-icon>
                  } @else {
                  <mat-icon class="text-gray-600">edit</mat-icon>
                  }
                </button>
                <button
                  mat-icon-button
                  class="mx-2"
                  (click)="deleteContact(element.id)"
                  disabled="{{
                    deletingContactId !== -1 || editingContact !== -1
                  }}"
                >
                  @if(deletingContactId===-1 && editingContact === -1){
                  <mat-icon class="text-red-600">delete</mat-icon>
                  } @else { @if(deletingContactId === element.id){
                  <mat-spinner
                    diameter="24"
                    mode="indeterminate"
                    color="accent"
                  ></mat-spinner>
                  } @else{
                  <mat-icon class="text-gray-600">delete</mat-icon>
                  } }
                </button>
                } @else{
                <div class="flex items-center h-full">
                  <button
                    mat-icon-button
                    class="mx-2"
                    (click)="
                      updateContact(
                        element.id,
                        editingContactName,
                        editingContactValue
                      )
                    "
                    disabled="{{ savingEditedContact }}"
                  >
                    @if(savingEditedContact){
                    <mat-spinner
                      diameter="24"
                      mode="indeterminate"
                    ></mat-spinner>
                    }@else {
                    <mat-icon class="text-green-600">save</mat-icon>
                    }
                  </button>
                  <button
                    mat-icon-button
                    class="mx-2"
                    (click)="setEditMode(-1, '', '')"
                    disabled="{{ savingEditedContact }}"
                  >
                    @if(savingEditedContact){
                    <mat-icon class="text-gray-600">cancel</mat-icon>} @else {
                    <mat-icon class="text-red-600">cancel</mat-icon>}
                  </button>
                </div>
                }
              </div>
              }
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
    @if(credentials==='admin' && addingNewContact===false){
    <div class="w-full flex pr-5 mb-5">
      <button
        class="ml-auto"
        mat-fab
        color="primary"
        (click)="changeAddNewContactFlag(true)"
        disabled="{{ deletingContactId !== -1 }}"
      >
        <mat-icon>add</mat-icon>
      </button>
    </div>
    } @else if (credentials === 'admin' && addingNewContact === true){
    <div class="m-5 flex">
      <mat-form-field class="mx-2">
        <mat-label>{{ translationsService.t("contactName") }}</mat-label>
        <input matInput placeholder="email" [(ngModel)]="newContactName" />
      </mat-form-field>
      <mat-form-field class="mx-2 w-full">
        <mat-label>{{ translationsService.t("contactValue") }}</mat-label>
        <input
          matInput
          placeholder="{{ translationsService.t('examplemail@mail.com') }}"
          [(ngModel)]="newContactValue"
        />
      </mat-form-field>
      <div class="flex h-auto items-center ml-auto">
        <button
          mat-button
          color="primary"
          (click)="addContact(newContactName, newContactValue)"
          disabled="{{ savingNewContact }}"
        >
          @if(savingNewContact){
          <mat-spinner diameter="30" mode="indeterminate"></mat-spinner>
          } @else {
          {{ translationsService.t("add") }}
          }
        </button>
        <button
          mat-button
          color="warn"
          (click)="changeAddNewContactFlag(false)"
          disabled="{{ savingNewContact }}"
        >
          {{ translationsService.t("cancel") }}
        </button>
      </div>
    </div>
    } } @else {
    <app-loading text="{{ translationsService.t('loading') }}" />
    }
  `,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    LoadingPageComponent,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
})
export class ContactPageComponent {
  translationsService = inject(TranslationService);
  credentials = ""; //todo: remove after add users
  debugDelay = 1000; //todo: remove

  addingNewContact = false;
  savingNewContact = false;
  newContactName = "";
  newContactValue = "";

  editingContact = -1;
  editingContactName = "";
  editingContactValue = "";
  savingEditedContact = false;

  deletingContactId = -1;

  contactService = inject(ContactService);
  state: PageState<ContactData> = { state: LIST_STATE_VALUE.IDLE };
  listStateValue = LIST_STATE_VALUE;

  displayedColumns: string[] = ["contactName", "contactValue"];

  changeAddNewContactFlag(value: boolean) {
    this.addingNewContact = value;
    if (value === false) {
      this.newContactName = "";
      this.newContactValue = "";
    }
  }

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

  setEditMode(id: number, name: string, value: string) {
    this.editingContact = id;
    this.editingContactName = name;
    this.editingContactValue = value;
  }

  async addContact(name: string, value: string): Promise<void> {
    this.savingNewContact = true;
    await wait(this.debugDelay); //todo: remove
    this.contactService
      .add({ contactName: name, contactValue: value })
      .subscribe({
        next: (res) => {
          if (this.state.state == LIST_STATE_VALUE.SUCCESS) {
            this.state.result = [...this.state.result, res];
          }
          console.log(
            this.state.state === LIST_STATE_VALUE.SUCCESS
              ? this.state.result
              : ""
          );
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
    this.newContactName = "";
    this.newContactValue = "";
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
}
