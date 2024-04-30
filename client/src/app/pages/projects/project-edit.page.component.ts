import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslationService } from "../../services/translation.service";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { LIST_STATE_VALUE, PageState } from "../../utils/page-state.type";
import { waitDebug } from "../../utils/wait";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProjectEditImageComponent } from "./project-edit-image.component";
import { ProjectDisableButtonsService } from "./services/disable-buttons.service";

@Component({
  selector: "app-project-edit",
  standalone: true,
  styles: ``,
  template: `
    @if(state.state === listStateValue.SUCCESS){
    <button
      disabled="{{ disabledButtons }}"
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
      disabled="{{ disabledButtons }}"
      (click)="getProjectData(id)"
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
            [(ngModel)]="state.result[0].title"
            name="title"
            disabled="{{ disabledButtons }}"
          />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("description") }}</mat-label>
          <textarea
            matInput
            [(ngModel)]="state.result[0].description"
            name="description"
            disabled="{{ disabledButtons }}"
          ></textarea>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ translationService.t("github") }}</mat-label>
          <input
            matInput
            [(ngModel)]="state.result[0].github"
            name="github"
            disabled="{{ disabledButtons }}"
          />
        </mat-form-field>
      </form>
      <app-project-edit-image [state]="state.result[0]" />
    </div>
    } @else {
    <app-loading text="{{ translationService.t('loading') }}" />
    }
  `,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    LoadingPageComponent,
    FormsModule,
    MatProgressSpinnerModule,
    ProjectEditImageComponent,
  ],
})
export class ProjectEditPageComponent {
  translationService = inject(TranslationService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private disableButtonsService = inject(ProjectDisableButtonsService);
  private projectsService = inject(ProjectsService);

  id = "";
  saving = false;
  disabledButtons = false;
  listStateValue = LIST_STATE_VALUE;
  credentials = ""; //todo: remove after add users
  state: PageState<ProjectData> = { state: LIST_STATE_VALUE.IDLE };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "-1";
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.disableButtonsService.state$.subscribe((state) => {
      this.disabledButtons = state;
    });
    this.getProjectData(this.id);
  }

  async getProjectData(id: string): Promise<void> {
    this.state = { state: LIST_STATE_VALUE.LOADING };
    await waitDebug(); //todo: remove

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

  async updateProject(
    title: string,
    description: string,
    github: string,
    photos: string[]
  ) {
    if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
      this.saving = true;
      this.disableButtonsService.updateState(true);
      await waitDebug(); //todo: remove
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
            this.disableButtonsService.updateState(false);
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
