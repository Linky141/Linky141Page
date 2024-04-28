import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-contact-new-contact",
  standalone: true,
  template: `
    @if(credentials==='admin' && addingNewContact===false){
    <div class="w-full flex pr-5 mb-5">
      <button
        class="ml-auto"
        mat-fab
        color="primary"
        (click)="changeFlagAddingNewContact(true)"
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
          (click)="addContactLocal(newContactName, newContactValue)"
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
          (click)="changeFlagAddingNewContact(false)"
          disabled="{{ savingNewContact }}"
        >
          {{ translationsService.t("cancel") }}
        </button>
      </div>
    </div>
    }
  `,
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ContactNewContectComponent {
  @Input() credentials: string = "";
  @Input() addingNewContact: boolean = false;
  @Input() savingNewContact: boolean = false;
  @Input() deletingContactId: number = -1;

  @Output() changeAddNewContactFlag = new EventEmitter<boolean>();
  @Output() addContact = new EventEmitter<{ name: string; value: string }>();

  translationsService = inject(TranslationService);

  newContactName = "";
  newContactValue = "";

  changeFlagAddingNewContact(value: boolean) {
    this.changeAddNewContactFlag.emit(value);
    if (value === false) {
      this.newContactName = "";
      this.newContactValue = "";
    }
  }

  addContactLocal(name: string, value: string) {
    this.addContact.emit({
      name: this.newContactName,
      value: this.newContactValue,
    });
    this.newContactName = "";
    this.newContactValue = "";
  }
}
