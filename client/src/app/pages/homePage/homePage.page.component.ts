import { Component, EventEmitter, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HomePageData } from "../../models/home-page.model";
import { LIST_STATE_VALUE, PageState } from "../../utils/page-state.type";
import { FormsModule } from "@angular/forms";
import { HomePageService } from "../../services/home-page.servicee";
// import { HomePageUpdatePayload } from "../../services/home-page.service";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    @if(editMode === false){
    <h1 class="text-center text-3xl mt-4 mb-3 mx-5  ">
      {{ title }}
    </h1>
    <h1 class=" mx-5 whitespace-pre-line">
      {{ content }}
    </h1>

    @if(credentials==='admin'){
    <button
      mat-stroked-button
      color="primary"
      (click)="buttonChangeEditMode(true)"
      class=" ml-5"
    >
      {{ translationService.t("edit") }}
    </button>
    } } @else {
    <mat-form-field class="w-full">
      <mat-label>Title</mat-label>
      <input matInput class="w-full" [(ngModel)]="title" />
    </mat-form-field>
    <mat-form-field class="w-full">
      <mat-label>Content</mat-label>
      <textarea matInput [(ngModel)]="content"></textarea>
    </mat-form-field>
    <button
      class=" ml-5"
      mat-flat-button
      color="primary"
      (click)="updateHomePage()"
    >
      {{ translationService.t("submit") }}
    </button>
    <button mat-button color="primary" (click)="resetControlsValues()">
      {{ translationService.t("reset") }}
    </button>
    <button (click)="buttonChangeEditMode(false)" mat-button color="warn">
      {{ translationService.t("cancel") }}
    </button>
    }
  `,
})
export class HomePagePageComponent {
  credentials = ""; //todo: remove after add users
  private homePageService = inject(HomePageService);
  state: PageState<HomePageData> = { state: LIST_STATE_VALUE.IDLE };
  editMode = false;
  title = "";
  content = "";

  translationService = inject(TranslationService);

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.getAllHomePageData();
  }

  getAllHomePageData(): void {
    this.state = { state: LIST_STATE_VALUE.LOADING };

    this.homePageService.getAll().subscribe({
      next: (res) => {
        this.state = {
          state: LIST_STATE_VALUE.SUCCESS,
          result: res.body!,
        };
        this.title = this.state.result[0].title;
        this.content = this.state.result[0].content;
      },
      error: (err) => {
        this.state = {
          state: LIST_STATE_VALUE.ERROR,
          error: err,
        };
      },
    });
  }

  buttonChangeEditMode(edit: boolean) {
    if (this.state.state == LIST_STATE_VALUE.SUCCESS) {
      this.editMode = edit;
      if (edit === false) {
        this.resetControlsValues();
      }
    }
  }

  resetControlsValues() {
    if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
      this.title = this.state.result[0].title;
      this.content = this.state.result[0].content;
    }
  }

  updateHomePage() {
    // let payload: HomePageUpdatePayload;
    // payload.title = this.title;
    // payload.content = this.content;
    this.homePageService
      .update({ title: this.title, content: this.content })
      .subscribe({
        next: (res) => {
          if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
            this.state.result[0].title = res.title;
            this.state.result[0].content = res.content;
            this.title = res.title;
            this.content = res.content;
            this.editMode = false;
          }
        },
      });

    // .then((res) => {
    //   if (res instanceof Error) {
    //     alert(res.message);
    //   } else {
    //     this.title = res.title;
    //     this.content = res.content;
    //     this.editMode = false;
    //   }
    // });
  }
}
