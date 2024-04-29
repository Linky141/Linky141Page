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
import { ActivatedRoute, Router } from "@angular/router";
import { DialogImage } from "./dialog-image.component";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { wait } from "../../utils/wait";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-project",
  standalone: true,
  styles: ``,
  template: `
    @if(state.state === listStateValue.SUCCESS){
    <h1 class="text-3xl mt-5 mb-3" style="text-align: center;">
      {{ state.result[0].title }}
    </h1>

    <div class="flex justify-center items-center mb-5">
      <div
        class="flex justify-center flex-wrap mx-auto"
        style="max-width: 75%;"
      >
        @for (photo of state.result[0].photos; track $index) {
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

    <h1 class="mx-5">{{ state.result[0].description }}</h1>
    <h1 class="mx-5 mt-3 text-xs">
      {{ translationService.t("lastUpdate") }}:
      {{ state.result[0].lastUpdate | customDate }}
    </h1>
    @if(credentials==='admin'){
    <button
      mat-button
      color="primary"
      class="mt-4 ml-4"
      disabled="{{ deleting }}"
    >
      {{ translationService.t("edit") }}
    </button>
    <button
      mat-button
      color="warn"
      class="mt-4"
      disabled="{{ deleting }}"
      (click)="deleteProject(state.result[0].id)"
    >
      @if(deleting){
      <mat-spinner
        diameter="30"
        mode="indeterminate"
        color="accent"
      ></mat-spinner>
      }@else{
      {{ translationService.t("remove") }}
      }
    </button>
    }
    <div class="flex justify-center items-center flex-col mt-5">
      @for (comment of state.result[0].comments; track $index) {
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
          <textarea matInput disabled="{{ deleting }}"></textarea>
        </mat-form-field>
        <div class="flex justify-end">
          <button mat-stroked-button color="accent" disabled="{{ deleting }}">
            {{ translationService.t("addComment") }}
          </button>
        </div>
      </form>
      }
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
    MatGridListModule,
    LoadingPageComponent,
    MatProgressSpinnerModule,
  ],
})
export class ProjectPageComponent {
  translationService = inject(TranslationService);
  route = inject(ActivatedRoute);
  private router = inject(Router);
  dialog = inject(MatDialog);

  id = "";
  credentials = ""; //todo: remove after add users
  listStateValue = LIST_STATE_VALUE;
  deleting = false;

  private projectsService = inject(ProjectsService);
  state: PageState<ProjectData> = { state: LIST_STATE_VALUE.IDLE };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "-1";
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.getProjectData();
  }

  async getProjectData(): Promise<void> {
    this.state = { state: LIST_STATE_VALUE.LOADING };
    await wait(400); //todo: remove

    this.projectsService.getSingle(this.id).subscribe({
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
    this.deleting = true;
    await wait(2000); //todo: remove
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
    this.router.navigate(["/projects"]);
  }

  openImage(image: string) {
    this.dialog.open(DialogImage, {
      data: {
        url: image,
      },
    });
  }
}
