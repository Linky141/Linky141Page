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
import { LIST_STATE_VALUE, PageState } from "../../utils/page-state.type";
import { wait } from "../../utils/wait";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { FormsModule } from "@angular/forms";
import { NewImageDialog } from "./new-image-dialog.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-project-edit",
  standalone: true,
  styles: ``,
  template: `
    @if(state.state === listStateValue.SUCCESS){
    <button
      disabled="{{ saving }}"
      class="ml-5 mt-5 w-24"
      mat-flat-button
      color="primary"
      (click)="
        updateProject(
          state.result[0].title,
          state.result[0].description,
          state.result[0].github,
          state.result[0].photos
        )
      "
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
      (click)="getProjectData(id)"
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
            [(ngModel)]="state.result[0].title"
            name="title"
            disabled="{{ saving }}"
          />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("description") }}</mat-label>
          <textarea
            matInput
            [(ngModel)]="state.result[0].description"
            name="description"
            disabled="{{ saving }}"
          ></textarea>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("github") }}</mat-label>
          <input
            matInput
            [(ngModel)]="state.result[0].github"
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
          @for (photo of state.result[0].photos; track $index) {
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
              (click)="removePhoto(photo)"
              disabled="{{ saving }}"
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
              (click)="addPhoto()"
              disabled="{{ saving }}"
            >
              <mat-icon>add</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    } @else {
    <app-loading text="{{ translationService.t('loading') }}" />
    }
  `,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    CustomDatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    LoadingPageComponent,
    FormsModule,
    MatProgressSpinnerModule,
  ],
})
export class ProjectEditPageComponent {
  translationService = inject(TranslationService);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  private router = inject(Router);

  id = "";
  saving = false;

  listStateValue = LIST_STATE_VALUE;
  credentials = ""; //todo: remove after add users
  private projectsService = inject(ProjectsService);
  state: PageState<ProjectData> = { state: LIST_STATE_VALUE.IDLE };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "-1";
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.getProjectData(this.id);
  }

  async getProjectData(id: string): Promise<void> {
    this.state = { state: LIST_STATE_VALUE.LOADING };
    await wait(400); //todo: remove

    this.projectsService.getSingle(id).subscribe({
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

  openImage(image: string) {
    this.dialog.open(DialogImage, {
      data: {
        url: image,
      },
    });
  }

  addPhoto() {
    const dialogRef = this.dialog.open(NewImageDialog, { data: { url: "" } });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && this.state.state === LIST_STATE_VALUE.SUCCESS) {
        this.state.result[0].photos = [...this.state.result[0].photos, res];
      }
    });
  }

  removePhoto(photo: string) {
    if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
      this.state.result[0].photos = this.state.result[0].photos.filter(
        (p) => p !== photo
      );
    }
  }

  async updateProject(
    title: string,
    description: string,
    github: string,
    photos: string[]
  ) {
    if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
      this.saving = true;
      await wait(2000); //todo: remove
      let currentDate = new Date();
      this.projectsService
        .update(this.state.result[0].id, {
          title: title,
          description: description,
          github: github,
          lastUpdate: currentDate.getTime(),
          photos: photos,
          comments: this.state.result[0].comments,
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
            this.backToProjects();
          },
          error: (res) => {
            alert(res.message);
          },
        });
    }
  }

  backToProjects() {
    this.router.navigate(["/projects"]);
  }
}
