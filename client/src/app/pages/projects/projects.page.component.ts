import { Component, inject } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { RouterModule } from "@angular/router";
// import { ProjectModel } from "../../models/project.model";

export type ProjectModel = {
  id: number;
  title: string;
  date: number;
  github: string;
  description: string;
  photos: string[];
  comments: string[];
};

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
            {{ project.date | customDate }}</mat-card-subtitle
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
      date: 1700291084476,
      description: "Project 1 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
      comments: ["comment1", "comment2", "comment3"],
    },
    {
      id: 2,
      title: "Project 2",
      date: 1700291084476,
      description: "Project 2 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
      comments: ["comment1", "comment2", "comment3"],
    },
    {
      id: 3,
      title: "Project 3",
      date: 1700291084476,
      description: "Project 3 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
      comments: ["comment1", "comment2", "comment3"],
    },
    {
      id: 4,
      title: "Project 4",
      date: 1700291084476,
      description: "Project 4 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
      comments: ["comment1", "comment2", "comment3"],
    },
    {
      id: 5,
      title: "Project 5",
      date: 1700291084476,
      description: "Project 5 description",
      github: "www.google.pl",
      photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
      comments: ["comment1", "comment2", "comment3"],
    },
  ];
}
