import { Component, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AboutService } from "./services/about.service";
import { LIST_STATE_VALUE, PageState } from "../../utils/page-state.type";
import { AboutData } from "./models/about.model";
import { waitDebug } from "../../utils/wait";
import { FormsModule } from "@angular/forms";
import { LoadingPageComponent } from "../../components/loading/loading.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-about",
  standalone: true,
  template: `
    @if(state.state === listStateValue.SUCCESS){ @if(editMode === false){
    <h1 class=" mx-5 mt-5 whitespace-pre-line">
      {{ content }}
    </h1>
    } @if(credentials==='admin'){ @if(editMode === false){
    <button
      (click)="buttonChangeEditMode(true)"
      class=" ml-5"
      mat-stroked-button
      color="primary"
    >
      {{ translationService.t("edit") }}
    </button>
    } @else {
    <mat-form-field class="w-full">
      <textarea matInput [(ngModel)]="content"></textarea>
    </mat-form-field>
    <button
      class="ml-5 w-24"
      mat-flat-button
      color="primary"
      (click)="updateAbout()"
      disabled="{{ savingData }}"
    >
      @if(savingData===true){
      <mat-spinner diameter="30" mode="indeterminate"></mat-spinner>
      } @else {
      {{ translationService.t("submit") }}
      }
    </button>
    <button mat-button color="primary" disabled="{{ savingData }}">
      {{ translationService.t("reset") }}
    </button>
    <button
      (click)="buttonChangeEditMode(false)"
      mat-button
      color="warn"
      disabled="{{ savingData }}"
    >
      {{ translationService.t("cancel") }}
    </button>
    } } } @else {
    <app-loading text="{{ translationService.t('loading') }}" />
    }
  `,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    LoadingPageComponent,
    MatProgressSpinnerModule,
  ],
})
export class AboutPageComponent {
  credentials = ""; //todo: remove after add users
  editMode = false;

  private aboutService = inject(AboutService);
  translationService = inject(TranslationService);
  state: PageState<AboutData> = { state: LIST_STATE_VALUE.IDLE };
  content = "";
  listStateValue = LIST_STATE_VALUE;
  savingData = false;

  ngOnInit() {
    this.credentials = localStorage.getItem("credentials") || ""; //todo: remove after add users
    this.getAllAboutData();
  }

  async getAllAboutData(): Promise<void> {
    this.state = { state: LIST_STATE_VALUE.LOADING };
    await waitDebug(); //todo: remove

    this.aboutService.getAll().subscribe({
      next: (res) => {
        this.state = {
          state: LIST_STATE_VALUE.SUCCESS,
          result: res.body!,
        };
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
      this.content = this.state.result[0].content;
    }
  }

  async updateAbout() {
    this.savingData = true;
    await waitDebug(); //todo: remove
    this.aboutService.update({ content: this.content }).subscribe({
      next: (res) => {
        if (this.state.state === LIST_STATE_VALUE.SUCCESS) {
          this.state.result[0].content = res.content;
          this.content = res.content;
          this.editMode = false;
          this.savingData = false;
        }
      },
    });
  }
}
