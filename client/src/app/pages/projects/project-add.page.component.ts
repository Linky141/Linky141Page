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
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogImage } from "./dialog-image.component";
import { FormsModule } from "@angular/forms";
import { wait } from "../../utils/wait";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NewImageDialog } from "./new-image-dialog.component";

@Component({
  selector: "app-project-add",
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
    FormsModule,
    MatProgressSpinnerModule,
  ],
  styles: ``,
  template: `
    <button
      class="ml-5 mt-5 w-28"
      mat-flat-button
      color="primary"
      disabled="{{ saving }}"
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
      disabled="{{ saving }}"
      (click)="resetForm()"
    >
      {{ translationService.t("reset") }}
    </button>
    <button
      class="mt-5"
      mat-button
      color="warn"
      disabled="{{ saving }}"
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
            disabled="{{ saving }}"
          />
        </mat-form-field>
        <mat-form-field class="w-full h-72">
          <mat-label>{{ translationService.t("description") }}</mat-label>
          <textarea
            matInput
            [(ngModel)]="description"
            name="description"
            disabled="{{ saving }}"
          ></textarea>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("github") }}</mat-label>
          <input
            matInput
            [(ngModel)]="github"
            name="github"
            disabled="{{ saving }}"
          />
        </mat-form-field>
      </form>
      <div class="flex justify-center items-center mb-5">
        <div
          class="flex justify-center flex-wrap mx-auto"
          style="max-width: 75%;"
        >
          @for (photo of photos; track $index) {
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
            <button
              mat-fab
              color="warn"
              class="m-2"
              disabled="{{ saving }}"
              (click)="removePhoto(photo)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card>
          }
          <div class="flex justify-center items-center m-2 w-52 h-72">
            <button
              mat-fab
              color="primary"
              class="m-2"
              disabled="{{ saving }}"
              (click)="addPhoto()"
            >
              <mat-icon>add</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectAddPageComponent {
  translationService = inject(TranslationService);
  dialog = inject(MatDialog);
  private router = inject(Router);

  credentials = ""; //todo: remove after add users
  saving = false;
  addingImage = false;

  title = "";
  description = "";
  github = "";
  photos: string[] = [];

  private projectsService = inject(ProjectsService);
  state: PageState<ProjectData> = { state: LIST_STATE_VALUE.IDLE };

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
  }

  async addProject(
    title: string,
    description: string,
    github: string,
    photos: string[]
  ): Promise<void> {
    this.saving = true;
    await wait(2000); //todo: remove
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
    this.backToProjects();
  }

  openImage(image: string) {
    this.dialog.open(DialogImage, {
      data: {
        url: image,
      },
    });
  }

  resetForm() {
    this.title = "";
    this.description = "";
    this.github = "";
    this.photos = [];
  }

  backToProjects() {
    this.router.navigate(["/projects"]);
  }

  addPhoto() {
    const dialogRef = this.dialog.open(NewImageDialog, { data: { url: "" } });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.photos = [...this.photos, res];
      }
    });
  }

  removePhoto(photo: string) {
    this.photos = this.photos.filter((p) => p !== photo);
  }
}
