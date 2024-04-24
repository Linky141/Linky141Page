import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-downloads-add",
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CustomDatePipe,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="flex justify-center items-center flex-col">
      <form class="w-3/4 mt-4">
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("name") }}</mat-label>
          <input matInput />
        </mat-form-field>
        <mat-form-field class="w-full h-72">
          <mat-label>{{ translationService.t("description") }}</mat-label>
          <textarea matInput></textarea>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("addressUrl") }}</mat-label>
          <textarea matInput></textarea>
        </mat-form-field>
      </form>
      <div>
        <button class="ml-5 mt-5" mat-flat-button color="primary">
          {{ translationService.t("submit") }}
        </button>
        <button class="mt-5" mat-button color="warn">
          {{ translationService.t("cancel") }}
        </button>
      </div>
    </div>
  `,
})
export class DownloadsAddPageComponent {
  translationService = inject(TranslationService);

  credentials = ""; //todo: remove after add users

  // displayedColumns: string[] = ["name", "description", "link", "uploaded"];
  // dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }
}
