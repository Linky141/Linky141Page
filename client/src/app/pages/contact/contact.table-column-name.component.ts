import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslationService } from "../../services/translation.service";
import { FormsModule } from "@angular/forms";
import { ContactData } from "./models/contact.model";

@Component({
  selector: "app-contact-table-column-name",
  standalone: true,
  template: `
    @if(editingContact !== element.id){
    {{ element.contactName }}
    } @else {
    <mat-form-field class="mx-2 mt-5 w-full">
      <mat-label>{{ translationsService.t("contactName") }}</mat-label>
      <input
        matInput
        placeholder="{{ translationsService.t('email') }}"
        [(ngModel)]="editingContactName"
        (ngModelChange)="emitContactName($event)"
      />
    </mat-form-field>
    }
  `,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
})
export class ContactTableColumnNameComponent {
  @Input() element: ContactData = {
    id: "0",
    contactName: "",
    contactValue: "",
  };
  @Input() editingContact: string = "-1";
  @Input() editingContactName: string = "";
  @Output() editingContactNameEmitter = new EventEmitter<string>();

  translationsService = inject(TranslationService);

  emitContactName(newName: string) {
    this.editingContactName = newName;
    this.editingContactNameEmitter.emit(newName);
  }
}
