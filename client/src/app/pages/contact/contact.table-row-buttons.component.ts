import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ContactData } from "../../models/contact.model";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-contact-table-row-buttons",
  standalone: true,
  template: `
    @if(credentials==='admin' && addingNewContact === false){
    <div class="ml-auto h-full">
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
  `,
  imports: [MatIconModule, MatProgressSpinnerModule, MatButtonModule],
})
export class ContactTableRowButtonsComponent {
  @Input() credentials: string = "";
  @Input() editingContactName: string = "";
  @Input() editingContactValue: string = "";
  @Input() element: ContactData = { id: 0, contactName: "", contactValue: "" };
  @Input() addingNewContact: boolean = false;
  @Input() savingEditedContact: boolean = false;
  @Input() editingContact: number = -1;
  @Input() deletingContactId: number = -1;

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

  emitdeleteContact(id: number) {
    this.deleteContactEmitter.emit({ id: id });
  }

  emitSetEditMode(id: number, name: string, value: string) {
    this.setEditModeEmitter.emit({ id: id, name: name, value: value });
  }

  emitUpdateContect(id: number, name: string, value: string) {
    this.updateContactEmitter.emit({ id: id, name: name, value: value });
  }
}
