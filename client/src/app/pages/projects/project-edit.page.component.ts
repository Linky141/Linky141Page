import { Component, inject } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute } from "@angular/router";
import { ProjectModel } from "../../models/project.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogImage } from "./dialog-image.component";

@Component({
  selector: "app-project-edit",
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    CustomDatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  styles: ``,
  template: `
    <button class="ml-5 mt-5" mat-flat-button color="primary">
      {{ translationService.t("submit") }}
    </button>
    <button class="mt-5" mat-button color="primary">
      {{ translationService.t("reset") }}
    </button>
    <button class="mt-5" mat-button color="warn">
      {{ translationService.t("cancel") }}
    </button>
    <div class="flex justify-center items-center flex-col">
      <form class="w-3/4 mt-4">
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("name") }}</mat-label>
          <input matInput value="{{ project.title }}" />
        </mat-form-field>
        <mat-form-field class="w-full h-72">
          <mat-label>{{ translationService.t("description") }}</mat-label>
          <textarea matInput>{{ project.description }}</textarea>
        </mat-form-field>
      </form>
      <div class="flex justify-center items-center mb-5">
        <div
          class="flex justify-center flex-wrap mx-auto"
          style="max-width: 75%;"
        >
          @for (photo of project.photos; track $index) {
          <mat-card class="m-1">
            <div class="flex justify-center items-center m-2 w-52 h-52">
              <img
                (click)="openImage(photo)"
                src="{{ photo }}"
                alt="Image"
                class="max-w-52 max-h-52 rounded-2xl"
                style="object-fit: contain;"
              />
            </div>
            <button mat-fab color="warn" class="m-2">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card>
          }
          <div class="flex justify-center items-center m-2 w-52 h-72">
            <button mat-fab color="primary" class="m-2">
              <mat-icon>add</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectEditPageComponent {
  translationService = inject(TranslationService);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);

  id = "";
  credentials = ""; //todo: remove after add users

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "-1";
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }

  openImage(image: string) {
    this.dialog.open(DialogImage, {
      data: {
        url: image,
      },
    });
  }

  project: ProjectModel = {
    id: 1,
    title: "Project 1",
    lastUpdate: 1700291084476,
    description:
      "Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. Project 1 description. ",
    github: "www.google.pl",
    photos: [
      "https://picsum.photos/100",
      "https://picsum.photos/800",
      "https://picsum.photos/200",
      "https://picsum.photos/500",
      "https://picsum.photos/300",
      "https://picsum.photos/200",
      "https://picsum.photos/200",
      "https://picsum.photos/500",
      "https://picsum.photos/2000",
      "https://picsum.photos/200",
    ],
    comments: [
      {
        id: 1,
        user: "USER1",
        content:
          "commnet commnet commnet commnet commnet commnet commnet commnet commnet commnet ",
        date: 1700291084476,
      },
      {
        id: 2,
        user: "USER2",
        content:
          "commnet commnet commnet commnet commnet commnet commnet commnet commnet commnet ",
        date: 1700291084476,
      },
    ],
  };
}
