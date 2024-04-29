import { Component, inject } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { CustomDatePipe } from "../../utils/pipes/custom-date.pipe";
import { TranslationService } from "../../services/translation.service";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { LIST_STATE_VALUE, PageState } from "../../utils/page-state.type";
import { wait } from "../../utils/wait";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CustomDateTimePipe } from "../../utils/pipes/custom-date-time.pipe";

@Component({
  selector: "app-projects",
  standalone: true,
  styles: `
  .example-card {
  max-width: 400px;
  }
  `,
  template: `
    @if(state.state === listStateValue.SUCCESS){
    <div class="flex justify-center items-center flex-col">
      @for (project of state.result; track $index) {
      <mat-card class="w-4/5 my-3">
        <mat-card-header>
          <mat-card-subtitle
            >{{ translationService.t("lastUpdate") }}:
            {{ project.lastUpdate | customDateTime }}</mat-card-subtitle
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
            disabled="{{ deletingProject !== '-1' }}"
          >
            {{ translationService.t("open") }}
          </button>
          @if(credentials==='admin'){
          <button
            mat-button
            color="primary"
            routerLink="/projectEdit/{{ project.id }}"
            disabled="{{ deletingProject !== '-1' }}"
          >
            {{ translationService.t("edit") }}
          </button>
          <button
            mat-button
            color="warn"
            (click)="deleteProject(project.id)"
            disabled="{{ deletingProject !== '-1' }}"
          >
            @if(project.id === deletingProject) {
            <mat-spinner
              diameter="30"
              mode="indeterminate"
              color="accent"
            ></mat-spinner>
            } @else{
            {{ translationService.t("remove") }}
            }
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
          routerLink="/projectAdd"
          disabled="{{ deletingProject !== '-1' }}"
        >
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
    } } @else {
    <app-loading text="{{ translationService.t('loading') }}" />
    }
  `,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    CustomDatePipe,
    RouterModule,
    MatIconModule,
    LoadingPageComponent,
    MatProgressSpinnerModule,
    CustomDateTimePipe,
  ],
})
export class ProjectsPageComponent {
  translationService = inject(TranslationService);

  credentials = ""; //todo: remove after add users
  listStateValue = LIST_STATE_VALUE;

  deletingProject = "-1";

  private projectsService = inject(ProjectsService);
  state: PageState<ProjectData> = { state: LIST_STATE_VALUE.IDLE };

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.getAllProjectsData();
  }

  async getAllProjectsData(): Promise<void> {
    this.state = { state: LIST_STATE_VALUE.LOADING };
    await wait(200); //todo: remove

    this.projectsService.getAll().subscribe({
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

  async deleteProject(id: string) {
    this.deletingProject = id;
    await wait(200); //todo: remove
    this.projectsService.delete(id).subscribe({
      next: () => {
        if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
          this.state.result = this.state.result.filter((del) => del.id !== id);
        }
      },
      error: (res) => {
        alert(res.message);
      },
    });
    this.deletingProject = "-1";
  }
}
