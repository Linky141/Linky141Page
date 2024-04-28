import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { ContactData } from "../../models/contact.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslationService } from "../../services/translation.service";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-contact-table-column-value",
  standalone: true,
  template: `
    <div class="flex">
      <div class="flex h-auto items-center w-full">
        @if(editingContact !== element.id){
        {{ element.contactValue }}
        }@else {
        <mat-form-field class="mx-2 mt-5 w-full">
          <mat-label>{{ translationsService.t("contactValue") }}</mat-label>
          <input
            matInput
            placeholder="{{ translationsService.t('examplemail@mail.com') }}"
            [(ngModel)]="editingContactValue"
          />
        </mat-form-field>
        }
      </div>
      @if(credentials==='admin' && addingNewContact === false){
      <div class="ml-auto">
        @if(editingContact !== element.id){
        <div class="flex items-center h-full">
          <button
            mat-icon-button
            class="mx-2"
            disabled="{{ deletingContactId !== -1 || editingContact !== -1 }}"
            (click)="
              emitSetEditMode(
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
            (click)="emitdeleteContact(element.id)"
            disabled="{{ deletingContactId !== -1 || editingContact !== -1 }}"
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
        </div>
        } @else{
        <div class="flex items-center h-full">
          <button
            mat-icon-button
            class="mx-2"
            (click)="
              emitUpdateContect(
                element.id,
                editingContactName,
                editingContactValue
              )
            "
            disabled="{{ savingEditedContact }}"
          >
            @if(savingEditedContact){
            <mat-spinner diameter="24" mode="indeterminate"></mat-spinner>
            }@else {
            <mat-icon class="text-green-600">save</mat-icon>
            }
          </button>
          <button
            mat-icon-button
            class="mx-2"
            (click)="emitSetEditMode(-1, '', '')"
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
  `,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class ContactTableColumnValueComponent {
  @Input() credentials: string = "";
  @Input() element: ContactData = { id: 0, contactName: "", contactValue: "" };
  @Input() savingEditedContact: boolean = false;
  @Input() addingNewContact: boolean = false;
  @Input() editingContactName: string = "";
  @Input() editingContactValue: string = "";
  @Input() deletingContactId: number = -1;
  @Input() editingContact: number = -1;
  //   @Input() editingContact: number = -1;
  //   @Input() editingContactName: string = "";
  @Output() setEditModeEmitter = new EventEmitter<{
    id: number;
    name: string;
    value: string;
  }>();
  @Output() updateContactEmitter = new EventEmitter<{
    id: number;
    name: string;
    value: string;
  }>();
  @Output() deleteContactEmitter = new EventEmitter<{
    id: number;
  }>();
  //   @Output() editingContactNameEmitter = new EventEmitter<string>();
  //   translationsService = inject(TranslationService);
  //   emitContactName(newName: string) {
  //     this.editingContactName = newName;
  //     this.editingContactNameEmitter.emit(newName);
  //   }

  translationsService = inject(TranslationService);

  emitSetEditMode(id: number, name: string, value: string) {
    this.setEditModeEmitter.emit({ id: id, name: name, value: value });
  }

  emitUpdateContect(id: number, name: string, value: string) {
    this.updateContactEmitter.emit({ id: id, name: name, value: value });
  }

  emitdeleteContact(id: number) {
    this.deleteContactEmitter.emit({ id: id });
  }
}
