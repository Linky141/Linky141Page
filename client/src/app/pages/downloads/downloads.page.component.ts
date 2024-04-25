import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { RouterModule } from "@angular/router";

export interface downloadItem {
  name: string;
  uploadDate: number;
  downloadLink: string;
  description: string;
}

const ELEMENT_DATA: downloadItem[] = [
  {
    name: "Example long name of item number one",
    description:
      "description of some items where will be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description oill be in the future real description description of some items where will be in the future real description description of some items where will be in the future real description description of some items where will be in the future real description description of some items where will be in the future real description",
    downloadLink: "https://www.youtube.com/",
    uploadDate: 1700291084476,
  },
  {
    name: "Item2",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "https://www.youtube.com/",
    uploadDate: 1700291084476,
  },
  {
    name: "Item3",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item4",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item5",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item6",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item7",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item8",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item9",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
  {
    name: "Item10",
    description:
      "description of some items where will be in the future real description",
    downloadLink: "www.google.pl",
    uploadDate: 1700291084476,
  },
];

@Component({
  selector: "app-downloads",
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CustomDatePipe,
    RouterModule,
  ],
  template: `
    <div class="m-5">
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef class="w-[200px]">
            {{ translationService.t("name") }}
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.name }}
          </td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>
            {{ translationService.t("description") }}
          </th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>
        <ng-container matColumnDef="link">
          <th mat-header-cell *matHeaderCellDef class="w-[50px]">
            {{ translationService.t("download") }}
          </th>
          <td mat-cell *matCellDef="let element">
            @if(credentials !== ''){
            <a href="{{ element.downloadLink }}">
              <button mat-icon-button>
                <mat-icon class="text-blue-500">download</mat-icon>
              </button>
            </a>
            } @else {
            <h1 class="text-xs text-center">
              {{ translationService.t("onlyForLoggedUsers") }}
            </h1>
            }
          </td>
        </ng-container>
        <ng-container matColumnDef="uploaded">
          <th mat-header-cell *matHeaderCellDef class="{{ lastCollumnWidth }}">
            {{ translationService.t("uploadDate") }}
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.uploadDate | customDate }} @if(credentials === 'admin'){
            <button mat-icon-button>
              <mat-icon class="text-red-600">delete</mat-icon>
            </button>
            }
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
    @if(credentials==='admin'){
    <div class="w-full flex pr-5 mb-5">
      <button
        class="ml-auto"
        mat-fab
        color="primary"
        routerLink="/downloadsAdd"
      >
        <mat-icon>add</mat-icon>
      </button>
    </div>
    }
  `,
})
export class DownloadsPageComponent {
  translationService = inject(TranslationService);

  credentials = ""; //todo: remove after add users
  lastCollumnWidth = "";

  displayedColumns: string[] = ["name", "description", "link", "uploaded"];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.lastCollumnWidth =
      this.credentials === "admin" ? "w-[157px]" : "w-[50px]";
  }
}
