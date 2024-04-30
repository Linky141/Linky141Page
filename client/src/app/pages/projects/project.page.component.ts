import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { TranslationService } from "../../services/translation.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { PageState, LIST_STATE_VALUE } from "../../utils/page-state.type";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { wait } from "../../utils/wait";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { CustomDateTimePipe } from "../../utils/pipes/custom-date-time.pipe";
import { ProjectImageComponent } from "./project-image.component";
import { ProjectCommentsComponent } from "./project-comments.component";
import { CommentModel } from "./models/comment.model";
import { ProjectDisableButtonsService } from "./services/disable-buttons.service";

@Component({
  selector: "app-project",
  standalone: true,
  styles: ``,
  template: `
    @if(state.state === listStateValue.SUCCESS){
    <h1 class="text-3xl mt-5 mb-3" style="text-align: center;">
      {{ state.result[0].title }}
    </h1>
    <app-project-image [state]="state.result[0]" />
    <h1 class="mx-5">{{ state.result[0].description }}</h1>
    @if(state.result[0].github){
    <button
      class="mx-5"
      mat-icon-button
      (click)="openGit(state.result[0].github)"
    >
      <mat-icon color="accent">code</mat-icon>
    </button>
    }
    <h1 class="mx-5 mt-3 text-xs">
      {{ translationService.t("lastUpdate") }}:
      {{ state.result[0].lastUpdate | customDateTime }}
    </h1>
    @if(credentials==='admin'){
    <button
      mat-button
      color="primary"
      class="mt-4 ml-4"
      disabled="{{ disabledButtons }}"
      routerLink="/projectEdit/{{ state.result[0].id }}"
    >
      {{ translationService.t("edit") }}
    </button>
    <button
      mat-button
      color="warn"
      class="mt-4"
      disabled="{{ disabledButtons }}"
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
    <app-project-comments
      [state]="state.result[0]"
      (addedCommentEmitter)="handleAddedCommentEmitter($event)"
    />
    } @else {
    <app-loading text="{{ translationService.t('loading') }}" />
    }
  `,
  imports: [
    MatButtonModule,
    LoadingPageComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule,
    CustomDateTimePipe,
    ProjectImageComponent,
    ProjectCommentsComponent,
  ],
})
export class ProjectPageComponent {
  translationService = inject(TranslationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);
  private disableButtonsService = inject(ProjectDisableButtonsService);

  state: PageState<ProjectData> = { state: LIST_STATE_VALUE.IDLE };

  id = "";
  credentials = ""; //todo: remove after add users
  listStateValue = LIST_STATE_VALUE;
  deleting = false;
  disabledButtons = false;
  newComment = "";

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

  async deleteProject(id: string) {
    this.disableButtonsService.updateState(true);
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
    this.disableButtonsService.updateState(false);
    this.router.navigate(["/projects"]);
  }

  handleAddedCommentEmitter(newComment: CommentModel) {
    if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
      this.state.result[0].comments = [
        ...this.state.result[0].comments,
        newComment,
      ];
    }
  }

  openGit(git: string) {
    window.location.href = git;
  }
}
