import { Component, inject } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { RouterModule } from "@angular/router";
import { ProjectModel } from "../../models/project.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    CustomDatePipe,
    RouterModule,
    MatIconModule,
  ],
  styles: `
  .example-card {
  max-width: 400px;
  }
  `,
  template: `
    <div class="flex justify-center items-center flex-col">
      @for (project of projects; track $index) {
      <mat-card class="w-4/5 my-3">
        <mat-card-header>
          <mat-card-subtitle
            >{{ translationService.t("lastUpdate") }}:
            {{ project.lastUpdate | customDate }}</mat-card-subtitle
          >
          <mat-card-title>{{ project.title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>{{ project.description }}</p>
          <mat-divider></mat-divider>
        </mat-card-content>
        <mat-card-actions>
          <button
            mat-button
            color="primary"
            routerLink="/project/{{ project.id }}"
          >
            {{ translationService.t("open") }}
          </button>
          @if(credentials==='admin'){
          <button
            mat-button
            color="primary"
            routerLink="/projectEdit/{{ project.id }}"
          >
            {{ translationService.t("edit") }}
          </button>
          <button mat-button color="warn">
            {{ translationService.t("remove") }}
          </button>
          }
        </mat-card-actions>
        <mat-card-footer>
          <!-- <mat-progress-bar mode="indeterminate"></mat-progress-bar> -->
        </mat-card-footer>
      </mat-card>
      }
    </div>
    @if(credentials==='admin'){
    <div class="w-full flex justify-center mb-5">
      <div class="flex w-4/5">
        <button
          class="ml-auto"
          mat-fab
          color="primary"
          routerLink="/projectEdit/0"
        >
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
    }
  `,
})
export class ProjectsPageComponent {
  translationService = inject(TranslationService);

  credentials = ""; //todo: remove after add users
  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }

  projects: ProjectModel[] = [
    {
      id: 1,
      title: "Project 1",
      lastUpdate: 1700291084476,
      description: "Project 1 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
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
    },
    {
      id: 2,
      title: "Project 2",
      lastUpdate: 1700291084476,
      description: "Project 2 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
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
    },
    {
      id: 3,
      title: "Project 3",
      lastUpdate: 1700291084476,
      description: "Project 3 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
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
    },
    {
      id: 4,
      title: "Project 4",
      lastUpdate: 1700291084476,
      description: "Project 4 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
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
    },
    {
      id: 5,
      title: "Project 5",
      lastUpdate: 1700291084476,
      description: "Project 5 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
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
    },
  ];
}
