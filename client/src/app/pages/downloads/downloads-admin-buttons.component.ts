import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { DownloadsService } from "./services/downloads.service";
import { DownloadsData } from "./models/downloads.model";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { wait } from "../../utils/wait";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DownloadsDeletingIdService } from "./services/downloads-deleting-id.service";

@Component({
  selector: "app-downloads-admin-buttons",
  standalone: true,
  template: `
    <button
      mat-icon-button
      (click)="deleteDownloads(element.id)"
      disabled="{{ deletingDownloadsId !== '-1' }}"
    >
      @if(deletingDownloadsId === '-1'){
      <mat-icon class="text-red-600">delete</mat-icon>
      } @else { @if(deletingDownloadsId === element.id){
      <mat-spinner
        diameter="24"
        mode="indeterminate"
        color="accent"
      ></mat-spinner>
      }@else {
      <mat-icon class="text-gray-600">delete</mat-icon>
      } }
    </button>
    <button
      mat-icon-button
      disabled="{{ deletingDownloadsId !== '-1' }}"
      [routerLink]="[
        '/downloadsUpdate',
        element.id,
        element.name,
        element.description,
        element.downloadLink
      ]"
    >
      @if(deletingDownloadsId === '-1'){
      <mat-icon color="primary">edit</mat-icon>
      } @else {
      <mat-icon class="text-gray-600">edit</mat-icon>
      }
    </button>
  `,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
})
export class DownloadsAdminButtonsComponent {
  @Input() element!: DownloadsData;
  @Input() state!: PageState<DownloadsData>;
  @Output() removedIdEmitter = new EventEmitter<string>();

  downloadsDeletingIdService = inject(DownloadsDeletingIdService);
  private downloadsService = inject(DownloadsService);

  deletingDownloadsId = "-1";

  ngOnInit() {
    this.downloadsDeletingIdService.deletingState$.subscribe((id) => {
      this.deletingDownloadsId = id;
    });
  }

  async deleteDownloads(id: string) {
    this.setDeletingDownloadsId(id);
    await wait(500); //todo: remove
    this.downloadsService.delete(id).subscribe({
      next: () => {
        if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
          this.state.result = this.state.result.filter((del) => del.id !== id);
          this.removedIdEmitter.emit(id);
        }
      },
      error: (res) => {
        alert(res.message);
      },
    });
    this.setDeletingDownloadsId("-1");
  }

  setDeletingDownloadsId(id: string) {
    this.downloadsDeletingIdService.updateDeletingState(id);
  }
}
