import { Component, inject } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { ActivatedRoute } from "@angular/router";
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
  selector: "app-project-edit",
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    CustomDatePipe,
  ],
  styles: `
  .example-card {
  max-width: 400px;
  }
  `,
  template: `
    <div class="flex justify-center items-center flex-col">
      Edit project {{ id }}
      <!-- @for (project of projects; track $index) {
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
          <button mat-button color="primary">
            {{ translationService.t("open") }}
          </button>
          @if(credentials==='admin'){
          <button mat-button color="primary">
            {{ translationService.t("edit") }}
          </button>
          <button mat-button color="warn">
            {{ translationService.t("remove") }}
          </button>
          }
        </mat-card-actions>
        <mat-card-footer>
          <mat-progress-bar mode="indeterminate"></mat-progress-bar> 
        </mat-card-footer>
      </mat-card>
      } -->
    </div>
  `,
})
export class ProjectEditPageComponent {
  translationService = inject(TranslationService);
  route = inject(ActivatedRoute);

  id = "";
  credentials = ""; //todo: remove after add users

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "-1";
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }

  project: ProjectModel = {
    id: 1,
    title: "Project 1",
    date: 1700291084476,
    description: "Project 1 description",
    github: "www.google.pl",
    photos: ["https://picsum.photos/200", "https://picsum.photos/200"],
    comments: ["comment1", "comment2", "comment3"],
  };
}
