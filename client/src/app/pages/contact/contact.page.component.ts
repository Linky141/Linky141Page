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
          <td mat-cell *matCellDef="let element">{{ element.contactName }}</td>
        </ng-container>
        <ng-container matColumnDef="contactValue">
          <th mat-header-cell *matHeaderCellDef>
            {{ translationsService.t("contactValue") }}
          </th>
          <td mat-cell *matCellDef="let element">
            <div class="flex">
              <div class="flex h-auto items-center">
                {{ element.contactValue }}
              </div>
              @if(credentials==='admin' && addingNewContact === false){
              <div class="ml-auto">
                <button
                  mat-icon-button
                  class="mx-2"
                  disabled="{{ deletingContactId !== -1 }}"
                >
                  @if(deletingContactId===-1){
                  <mat-icon class="text-blue-600">edit</mat-icon>
                  } @else {
                  <mat-icon class="text-gray-600">edit</mat-icon>
                  }
                </button>
                <button
                  mat-icon-button
                  class="mx-2"
                  (click)="deleteContact(element.id)"
                  disabled="{{ deletingContactId !== -1 }}"
                >
                  @if(deletingContactId===-1){
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

  addingNewContact = false;
  savingNewContact = false;
  newContactName = "";
  newContactValue = "";

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
    await wait(1000); //todo: remove

    this.contactService.getAll().subscribe({
      next: (res) => {
        this.state = {
          state: LIST_STATE_VALUE.SUCCESS,
          result: res.body!,
        };
        // this.dataSource = this.state.result;
      },
      error: (err) => {
        this.state = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }

  async addContact(name: string, value: string): Promise<void> {
    this.savingNewContact = true;
    await wait(500); //todo: remove
    this.contactService
      .add({ contactName: name, contactValue: value })
      .subscribe({
        next: (res) => {
          if (this.state.state == LIST_STATE_VALUE.SUCCESS) {
            // this.state.result.push(res);
            this.state.result = [...this.state.result, res];
            // this.dataSource = this.state.result;
          }
          console.log(
            this.state.state === LIST_STATE_VALUE.SUCCESS
              ? this.state.result
              : ""
          );
          // console.log(this.dataSource);
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
    await wait(3000); //todo: remove
    this.contactService.delete(id).subscribe({
      next: () => {
        if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
          this.state.result = this.state.result.filter((del) => del.id !== id);
          console.log(this.state.result);
        }
      },
      error: (res) => {
        alert(res.message);
      },
    });
    this.deletingContactId = -1;
  }

  updateContact(id: number, updatedContact: ContactUpdatePayload) {
    this.contactService.update(id, updatedContact).subscribe({
      next: (res) => {
        // this.dataSource = this.dataSource.map((d) => {
        //   if (d.id === res.id) {
        //     return res;
        //   } else {
        //     return d;
        //   }
        // });
      },
      error: (res) => {
        alert(res.message);
      },
    });
  }
}
