import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslationService } from "../../services/translation.service";
import { ProjectData } from "./models/project.model";
import { ProjectsService } from "./services/projects.service";
import { wait } from "../../utils/wait";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule } from "@angular/forms";
import { generateUUID } from "../../utils/guid-generator";
import { CustomDateTimePipe } from "../../utils/pipes/custom-date-time.pipe";
import { CommentModel } from "./models/comment.model";
import { ProjectDisableButtonsService } from "./services/disable-buttons.service";

@Component({
  selector: "app-project-comments",
  standalone: true,
  styles: ``,
  template: `
    <div class="flex justify-center items-center flex-col mt-5">
      @for (comment of state.comments; track $index) {
      <mat-card class="w-1/2 my-1">
        <mat-card-header>
          <mat-card-title>{{ comment.user }}</mat-card-title>
          <mat-card-subtitle>{{
            comment.date | customDateTime
          }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="whitespace-pre-line">{{ comment.content }}</p>
        </mat-card-content>
      </mat-card>
      } @if(credentials !== ''){
      <form class="w-1/2 my-1">
        <mat-form-field class="w-full" color="accent">
          <mat-label>{{ translationService.t("leaveAComment") }}</mat-label>
          <textarea
            matInput
            disabled="{{ disabledButtons }}"
            [(ngModel)]="newComment"
            name="newComment"
          ></textarea>
        </mat-form-field>
        <div class="flex justify-end">
          <button
            class="w-40"
            mat-stroked-button
            color="accent"
            disabled="{{ disabledButtons }}"
            (click)="addComment(newComment)"
          >
            @if(addingComment){
            <mat-spinner
              diameter="30"
              mode="indeterminate"
              color="accent"
            ></mat-spinner>
            }@else {
            {{ translationService.t("addComment") }}
            }
          </button>
        </div>
      </form>
      }
    </div>
  `,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    CustomDateTimePipe,
  ],
})
export class ProjectCommentsComponent {
  @Input() state!: ProjectData;
  @Output() addedCommentEmitter = new EventEmitter<CommentModel>();

  translationService = inject(TranslationService);
  private projectsService = inject(ProjectsService);
  private disableButtonsService = inject(ProjectDisableButtonsService);

  credentials = ""; //todo: remove after add users
  addingComment = false;
  newComment = "";
  disabledButtons = false;

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.disableButtonsService.state$.subscribe((state) => {
      this.disabledButtons = state;
    });
  }

  async addComment(comment: string) {
    this.disableButtonsService.updateState(true);
    this.addingComment = true;
    await wait(2000); //todo: remove
    let currentDate = new Date();
    let newComment: CommentModel = {
      id: generateUUID(),
      user: this.credentials,
      date: currentDate.getTime(),
      content: this.newComment,
    };
    this.projectsService
      .update(this.state.id, {
        title: this.state.title,
        description: this.state.description,
        github: this.state.github,
        lastUpdate: this.state.lastUpdate,
        photos: this.state.photos,
        comments: [...this.state.comments, newComment],
      })
      .subscribe({
        next: (res) => {
          this.emitAddedCommentEvent(newComment);
          this.newComment = "";
          this.disableButtonsService.updateState(false);
          this.addingComment = false;
        },
        error: (res) => {
          alert(res.message);
        },
      });
  }

  emitAddedCommentEvent(newComment: CommentModel) {
    this.addedCommentEmitter.emit(newComment);
  }
}
