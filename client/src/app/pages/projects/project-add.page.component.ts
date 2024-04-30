import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslationService } from "../../services/translation.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { waitDebug } from "../../utils/wait";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProjectDisableButtonsService } from "./services/disable-buttons.service";
import { ProjectAddImageComponent } from "./project-add-image.component";

@Component({
  selector: "app-project-add",
  standalone: true,
  styles: ``,
  template: `
    <button
      class="ml-5 mt-5 w-28"
      mat-flat-button
      color="primary"
      disabled="{{ disabledButtons }}"
      (click)="addProject(title, description, github, photos)"
    >
      @if(saving){
      <mat-spinner diameter="30" mode="indeterminate"></mat-spinner>
      }@else { {{ translationService.t("submit") }}}
    </button>
    <button
      class="mt-5"
      mat-button
      color="primary"
      disabled="{{ disabledButtons }}"
      (click)="resetForm()"
    >
      {{ translationService.t("reset") }}
    </button>
    <button
      class="mt-5"
      mat-button
      color="warn"
      disabled="{{ disabledButtons }}"
      (click)="backToProjects()"
    >
      {{ translationService.t("cancel") }}
    </button>
    <div class="flex justify-center items-center flex-col">
      <form class="w-3/4 mt-4">
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("name") }}</mat-label>
          <input
            matInput
            [(ngModel)]="title"
            name="title"
            disabled="{{ disabledButtons }}"
          />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("description") }}</mat-label>
          <textarea
            matInput
            [(ngModel)]="description"
            name="description"
            disabled="{{ disabledButtons }}"
          ></textarea>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("github") }}</mat-label>
          <input
            matInput
            [(ngModel)]="github"
            name="github"
            disabled="{{ disabledButtons }}"
          />
        </mat-form-field>
      </form>
      <app-project-add-image (photosEmitter)="handlePhotosEmitter($event)" />
    </div>
  `,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    ProjectAddImageComponent,
  ],
})
export class ProjectAddPageComponent {
  translationService = inject(TranslationService);
  private disableButtonsService = inject(ProjectDisableButtonsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);

  credentials = ""; //todo: remove after add users
  saving = false;
  disabledButtons = false;
  listStateValue = LIST_STATE_VALUE;
  title = "";
  description = "";
  github = "";
  photos: string[] = [];
  state: PageState<ProjectData> = { state: LIST_STATE_VALUE.IDLE };

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.disableButtonsService.state$.subscribe((state) => {
      this.disabledButtons = state;
    });
  }

  async addProject(
    title: string,
    description: string,
    github: string,
    photos: string[]
  ): Promise<void> {
    console.log(photos.length);
    this.saving = true;
    this.disableButtonsService.updateState(true);
    await waitDebug(); //todo: remove
    let currentDate = new Date();
    this.projectsService
      .add({
        title: title,
        description: description,
        github: github,
        lastUpdate: currentDate.getTime(),
        photos: photos,
        comments: [],
      })
      .subscribe({
        next: (res) => {
          if (this.state.state == LIST_STATE_VALUE.SUCCESS) {
            this.state.result = [...this.state.result, res];
          }
        },
        error: (err) => {
          this.state = {
            state: LIST_STATE_VALUE.ERROR,
            error: err,
          };
        },
      });

    this.saving = false;
    this.disableButtonsService.updateState(false);
    this.backToProjects();
  }

  handlePhotosEmitter(p: string[]) {
    this.photos = p;
  }

  backToProjects() {
    this.router.navigate(["/projects"]);
  }

  resetForm() {
    this.title = "";
    this.description = "";
    this.github = "";
    this.photos = [];
  }
}
