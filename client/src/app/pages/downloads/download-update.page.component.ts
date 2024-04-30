import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { waitDebug } from "../../utils/wait";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { DownloadsData } from "./models/downloads.model";
import { DownloadsService } from "./services/downloads.service";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-downloads-update",
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CustomDatePipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="flex justify-center items-center flex-col">
      <form class="w-3/4 mt-4">
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("name") }}</mat-label>
          <input matInput [(ngModel)]="name" name="name" />
        </mat-form-field>
        <mat-form-field class="w-full h-72">
          <mat-label>{{ translationService.t("description") }}</mat-label>
          <textarea
            matInput
            [(ngModel)]="description"
            name="description"
          ></textarea>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("addressUrl") }}</mat-label>
          <textarea
            matInput
            [(ngModel)]="addresUrl"
            name="addressUrl"
          ></textarea>
        </mat-form-field>
      </form>
      <div>
        <button
          class="ml-5 mt-5 w-28"
          mat-flat-button
          color="primary"
          (click)="updateDownloads(id, name, description, addresUrl)"
          disabled="{{ saving }}"
        >
          @if(saving){
          <mat-spinner diameter="30" mode="indeterminate"></mat-spinner>
          }@else {
          {{ translationService.t("submit") }}
          }
        </button>
        <button
          class="mt-5"
          mat-button
          color="warn"
          disabled="{{ saving }}"
          (click)="backToDownloads()"
        >
          {{ translationService.t("cancel") }}
        </button>
      </div>
    </div>
  `,
})
export class DownloadsUpdatePageComponent {
  translationService = inject(TranslationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  credentials = ""; //todo: remove after add users

  private downloadsService = inject(DownloadsService);
  state: PageState<DownloadsData> = { state: LIST_STATE_VALUE.IDLE };

  id = "";
  name = "";
  description = "";
  addresUrl = "";
  saving = false;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    this.name = this.route.snapshot.paramMap.get("name") || "";
    this.description = this.route.snapshot.paramMap.get("description") || "";
    this.addresUrl = this.route.snapshot.paramMap.get("addressurl") || "";
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }

  async updateDownloads(
    id: string,
    name: string,
    description: string,
    downloadLink: string
  ) {
    this.saving = true;
    await waitDebug(); //todo: remove
    let currentDate = new Date();
    this.downloadsService
      .update(id, {
        name: name,
        description: description,
        downloadLink: downloadLink,
        uploadDate: currentDate.getTime(),
      })
      .subscribe({
        next: (res) => {
          if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
            this.state.result = this.state.result.map((d) => {
              if (d.id === res.id) {
                return res;
              } else {
                return d;
              }
            });
          }
          this.saving = false;
          this.backToDownloads();
        },
        error: (res) => {
          alert(res.message);
        },
      });
  }

  backToDownloads() {
    this.router.navigate(["/downloads"]);
  }
}
