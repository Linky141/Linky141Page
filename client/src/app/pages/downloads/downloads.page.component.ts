import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TranslationService } from "../../services/translation.service";
import { RouterModule } from "@angular/router";
import { DownloadsService } from "./services/downloads.service";
import { DownloadsData } from "./models/downloads.model";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { wait } from "../../utils/wait";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { CustomDateTimePipe } from "../../utils/pipes/custom-date-time.pipe";
import { DownloadsAdminButtonsComponent } from "./downloads-admin-buttons.component";
import { DownloadsDeletingIdService } from "./services/downloads-deleting-id.service";

@Component({
  selector: "app-downloads",
  standalone: true,
  template: `
    @if(state.state === listStateValue.SUCCESS){
    <div class="m-5">
      <table mat-table [dataSource]="state.result">
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
              <button
                mat-icon-button
                disabled="{{ deletingDownloadsId !== '-1' }}"
              >
                @if(deletingDownloadsId === '-1'){
                <mat-icon class="text-blue-500">download</mat-icon>
                }@else {
                <mat-icon class="text-gray-600">download</mat-icon>
                }
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
            {{ translationService.t("lastUpdate") }}
          </th>
          <td mat-cell *matCellDef="let element">
            {{ element.uploadDate | customDateTime }}
            @if(credentials === 'admin'){
            <app-downloads-admin-buttons
              [element]="element"
              (removedIdEmitter)="removedIdEmitter($event)"
              [state]="state"
            />
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
        disabled="{{ deletingDownloadsId !== '-1' }}"
      >
        <mat-icon>add</mat-icon>
      </button>
    </div>
    } } @else {
    <app-loading text="{{ translationService.t('loading') }}" />
    }
  `,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    LoadingPageComponent,
    CustomDateTimePipe,
    DownloadsAdminButtonsComponent,
  ],
})
export class DownloadsPageComponent {
  translationService = inject(TranslationService);
  downloadsDeletingIdService = inject(DownloadsDeletingIdService);

  credentials = ""; //todo: remove after add users
  lastCollumnWidth = "";
  listStateValue = LIST_STATE_VALUE;
  deletingDownloadsId = "-1";

  private downloadsService = inject(DownloadsService);
  state: PageState<DownloadsData> = { state: LIST_STATE_VALUE.IDLE };

  displayedColumns: string[] = ["name", "description", "link", "uploaded"];

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.lastCollumnWidth =
      this.credentials === "admin" ? "w-[270px]" : "w-[170px]";
    this.downloadsDeletingIdService.deletingState$.subscribe((id) => {
      this.deletingDownloadsId = id;
    });
    this.getAllDownloadsData();
  }

  async getAllDownloadsData(): Promise<void> {
    this.state = { state: LIST_STATE_VALUE.LOADING };
    await wait(200); //todo: remove

    this.downloadsService.getAll().subscribe({
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

  removedIdEmitter(id: string) {
    if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
      console.log("removed " + id);

      this.state.result = this.state.result.filter((del) => del.id !== id);
    }
  }
}
