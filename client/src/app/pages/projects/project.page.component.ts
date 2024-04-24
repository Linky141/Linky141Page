import { Component, inject } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialog } from "@angular/material/dialog";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { ActivatedRoute } from "@angular/router";
import { ProjectModel } from "../../models/project.model";
import { DialogImage } from "./dialog-image.component";

@Component({
  selector: "app-project",
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    CustomDatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
  ],
  styles: ``,
  template: `
    <h1 class="text-3xl mt-5 mb-3" style="text-align: center;">
      {{ project.title }}
    </h1>

    <div class="flex justify-center items-center mb-5">
      <div
        class="flex justify-center flex-wrap mx-auto"
        style="max-width: 75%;"
      >
        @for (photo of project.photos; track $index) {
        <div class="flex justify-center items-center m-1 w-52 h-52">
          <img
            (click)="openImage(photo)"
            src="{{ photo }}"
            alt="Image"
            class="max-w-52 max-h-52 rounded-2xl"
            style="object-fit: contain;"
          />
        </div>
        }
      </div>
    </div>

    <h1 class="mx-5">{{ project.description }}</h1>
    <h1 class="mx-5 mt-3 text-xs">
      {{ translationService.t("lastUpdate") }}:
      {{ project.lastUpdate | customDate }}
    </h1>
    @if(credentials==='admin'){
    <button mat-button color="primary" class="mt-4 ml-4">
      {{ translationService.t("edit") }}
    </button>
    <button mat-button color="warn" class="mt-4">
      {{ translationService.t("remove") }}
    </button>
    }
    <div class="flex justify-center items-center flex-col mt-5">
      @for (comment of project.comments; track $index) {
      <mat-card class="w-1/2 my-1">
        <mat-card-header>
          <mat-card-title>{{ comment.user }}</mat-card-title>
          <mat-card-subtitle>{{ comment.date | customDate }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ comment.content }}</p>
        </mat-card-content>
      </mat-card>
      } @if(credentials !== ''){
      <form class="w-1/2 my-1">
        <mat-form-field class="w-full" color="accent">
          <mat-label>{{ translationService.t("leaveAComment") }}</mat-label>
          <textarea matInput></textarea>
        </mat-form-field>
        <div class="flex justify-end">
          <button mat-stroked-button color="accent">
            {{ translationService.t("addComment") }}
          </button>
        </div>
      </form>
      }
    </div>
  `,
})
export class ProjectPageComponent {
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
