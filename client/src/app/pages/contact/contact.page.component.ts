import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslationService } from "../../services/translation.service";

export interface ContactElement {
  id: number;
  contactName: string;
  contactContent: string;
}

const ELEMENT_DATA: ContactElement[] = [
  { id: 1, contactName: "skype", contactContent: "exampleValue" },
  { id: 2, contactName: "skype", contactContent: "exampleValue" },
  { id: 3, contactName: "skype", contactContent: "exampleValue" },
  { id: 4, contactName: "skype", contactContent: "exampleValue" },
  { id: 5, contactName: "skype", contactContent: "exampleValue" },
];

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="m-5">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="contactName">
          <th mat-header-cell *matHeaderCellDef class="w-[200px]">
            {{ translationsService.t("contactName") }}
          </th>
          <td mat-cell *matCellDef="let element">{{ element.contactName }}</td>
        </ng-container>
        <ng-container matColumnDef="contactContent">
          <th mat-header-cell *matHeaderCellDef>
            {{ translationsService.t("contactValue") }}
          </th>
          <td mat-cell *matCellDef="let element">
            <div class="flex">
              <div class="flex h-auto items-center">
                {{ element.contactContent }}
              </div>
              @if(credentials==='admin' && addNewContact === false){
              <div class="ml-auto">
                <button mat-icon-button class="mx-2">
                  <mat-icon class=" text-blue-600">edit</mat-icon></button
                ><button mat-icon-button class="mx-2">
                  <mat-icon class="text-red-600">delete</mat-icon>
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
    @if(credentials==='admin' && addNewContact===false){
    <div class="w-full flex pr-5 mb-5">
      <button
        class="ml-auto"
        mat-fab
        color="primary"
        (click)="changeAddNewContactFlag(true)"
      >
        <mat-icon>add</mat-icon>
      </button>
    </div>
    } @else if (credentials === 'admin' && addNewContact === true){
    <div class="m-5 flex">
      <mat-form-field class="mx-2">
        <mat-label>{{ translationsService.t("contactName") }}</mat-label>
        <input matInput placeholder="email" />
      </mat-form-field>
      <mat-form-field class="mx-2 w-full">
        <mat-label>{{ translationsService.t("contactValue") }}</mat-label>
        <input
          matInput
          placeholder="{{ translationsService.t('examplemail@mail.com') }}"
        />
      </mat-form-field>
      <div class="flex h-auto items-center ml-auto">
        <button mat-button color="primary">
          {{ translationsService.t("add") }}
        </button>
        <button
          mat-button
          color="warn"
          (click)="changeAddNewContactFlag(false)"
        >
          {{ translationsService.t("cancel") }}
        </button>
      </div>
    </div>
    }
  `,
})
export class ContactPageComponent {
  translationsService = inject(TranslationService);
  credentials = ""; //todo: remove after add users
  addNewContact = false;

  displayedColumns: string[] = ["contactName", "contactContent"];
  dataSource = ELEMENT_DATA;

  changeAddNewContactFlag(value: boolean) {
    this.addNewContact = value;
  }

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }
}
