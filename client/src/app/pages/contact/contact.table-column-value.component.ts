import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslationService } from "../../services/translation.service";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ContactTableRowButtonsComponent } from "./contact.table-row-buttons.component";
import { ContactData } from "./models/contact.model";

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
      <app-contact-table-row-buttons
        credentials="{{ credentials }}"
        editingContactName="{{ editingContactName }}"
        editingContactValue="{{ editingContactValue }}"
        [element]="element"
        [addingNewContact]="addingNewContact"
        [savingEditedContact]="savingEditedContact"
        [editingContact]="editingContact"
        [deletingContactId]="deletingContactId"
        (setEditModeEmitter)="emitSetEditMode($event)"
        (updateContactEmitter)="emitUpdateContect($event)"
        (deleteContactEmitter)="emitdeleteContact($event)"
      />
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
    ContactTableRowButtonsComponent,
  ],
})
export class ContactTableColumnValueComponent {
  @Input() credentials: string = "";
  @Input() element: ContactData = {
    id: "0",
    contactName: "",
    contactValue: "",
  };
  @Input() savingEditedContact: boolean = false;
  @Input() addingNewContact: boolean = false;
  @Input() editingContactName: string = "";
  @Input() editingContactValue: string = "";
  @Input() deletingContactId: string = "-1";
  @Input() editingContact: string = "-1";
  @Output() setEditModeEmitter = new EventEmitter<{
    id: string;
    name: string;
    value: string;
  }>();
  @Output() updateContactEmitter = new EventEmitter<{
    id: string;
    name: string;
    value: string;
  }>();
  @Output() deleteContactEmitter = new EventEmitter<{
    id: string;
  }>();

  translationsService = inject(TranslationService);

  emitSetEditMode(event: { id: string; name: string; value: string }) {
    this.setEditModeEmitter.emit({
      id: event.id,
      name: event.name,
      value: event.value,
    });
  }

  emitUpdateContect(event: { id: string; name: string; value: string }) {
    this.updateContactEmitter.emit({
      id: event.id,
      name: event.name,
      value: event.value,
    });
  }

  emitdeleteContact(event: { id: string }) {
    this.deleteContactEmitter.emit({ id: event.id });
  }
}
